import { ClientAppointment } from '@/contexts/AppContext';

export const checkAppointmentConflict = (
  newAppointment: Partial<ClientAppointment>,
  existingAppointments: ClientAppointment[],
  excludeId?: string
): { hasConflict: boolean; conflictingAppointments: ClientAppointment[] } => {
  const newStart = newAppointment.startHour ?? 0;
  const newDuration = newAppointment.duration ?? 1;
  const newEnd = newStart + newDuration;

  const conflictingAppointments = existingAppointments.filter((existing) => {
    if (excludeId && existing.id === excludeId) return false;
    if (existing.member !== newAppointment.member) return false;
    const existingStart = existing.startHour;
    const existingEnd = existing.startHour + existing.duration;
    // overlap if max(start) < min(end)
    return Math.max(newStart, existingStart) < Math.min(newEnd, existingEnd);
  });

  return {
    hasConflict: conflictingAppointments.length > 0,
    conflictingAppointments,
  };
};

export const getTimeSlotAvailability = (
  timeIndex: number, 
  memberIndex: number, 
  appointments: ClientAppointment[]
): { isOccupied: boolean; appointment?: ClientAppointment } => {
  const appointment = appointments.find(
    apt => apt.startHour === timeIndex && apt.member === memberIndex + 1
  );
  
  return {
    isOccupied: !!appointment,
    appointment
  };
};

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);
  
  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};

export const parseTimeString = (timeString: string): { hour: number; minute: number; isPM: boolean } => {
  const [time, period] = timeString.split(' ');
  const [hourStr, minuteStr] = time.split(':');
  
  return {
    hour: parseInt(hourStr),
    minute: parseInt(minuteStr || '0'),
    isPM: period.toLowerCase() === 'pm'
  };
};

export const calculateEndTime = (startTime: string, duration: number): string => {
  const { hour, minute, isPM } = parseTimeString(startTime);
  
  // Convert to 24-hour format
  let startHour24 = hour;
  if (isPM && hour !== 12) startHour24 += 12;
  if (!isPM && hour === 12) startHour24 = 0;
  
  // Calculate end time in minutes
  const startMinutes = startHour24 * 60 + minute;
  const endMinutes = startMinutes + (duration * 60);
  
  // Convert back to time format
  const endHour24 = Math.floor(endMinutes / 60) % 24;
  const endMin = endMinutes % 60;
  
  // Convert to 12-hour format
  let endHour12 = endHour24;
  const endPeriod = endHour24 >= 12 ? 'pm' : 'am';
  
  if (endHour24 > 12) endHour12 = endHour24 - 12;
  if (endHour24 === 0) endHour12 = 12;
  
  return `${endHour12}:${endMin.toString().padStart(2, '0')} ${endPeriod}`;
};

export const getStatusColor = (status: 'completed' | 'active' | 'pending'): string => {
  switch (status) {
    case 'completed':
      return '#EEF6FF';
    case 'active':
      return '#FBF5FF';
    case 'pending':
      return '#FEF7EC';
    default:
      return '#F5F5F5';
  }
};

export const getStatusBorderColor = (status: 'completed' | 'active' | 'pending'): string => {
  switch (status) {
    case 'completed':
      return '#CBDDEE';
    case 'active':
      return '#E8E3F5';
    case 'pending':
      return '#EFD8C0';
    default:
      return '#E5E5E5';
  }
};

export const generateTimeSlots = (): Array<{ value: string; label: string; index: number }> => {
  // Whole-hour slots from 6:00 AM (index 0) to 6:00 PM (index 12)
  const slots: Array<{ value: string; label: string; index: number }> = [];
  for (let i = 0; i <= 12; i += 1) {
    const hour24 = 6 + i; // 6 .. 18
    const period = hour24 >= 12 ? 'pm' : 'am';
    const hour12 = ((hour24 + 11) % 12) + 1;
    const value = `${hour12}:00 ${period}`;
    slots.push({ value, label: value.toUpperCase(), index: i });
  }
  return slots;
};