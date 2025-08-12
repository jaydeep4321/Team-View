import { ClientAppointment } from '@/contexts/AppContext';

export const checkAppointmentConflict = (
  newAppointment: Partial<ClientAppointment>, 
  existingAppointments: ClientAppointment[],
  excludeId?: string
): { hasConflict: boolean; conflictingAppointments: ClientAppointment[] } => {
  const conflictingAppointments = existingAppointments.filter(existing => {
    // Skip if this is the same appointment we're editing
    if (excludeId && existing.id === excludeId) return false;
    
    // Check if same member and overlapping time
    if (existing.member === newAppointment.member && existing.startHour === newAppointment.startHour) {
      return true;
    }
    
    return false;
  });

  return {
    hasConflict: conflictingAppointments.length > 0,
    conflictingAppointments
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
  return [
    { value: '6:00 am', label: '6:00 AM', index: 0 },
    { value: '7:00 am', label: '7:00 AM', index: 1 },
    { value: '8:00 am', label: '8:00 AM', index: 2 },
    { value: '9:00 am', label: '9:00 AM', index: 3 },
    { value: '10:00 am', label: '10:00 AM', index: 4 },
    { value: '11:00 am', label: '11:00 AM', index: 5 },
    { value: '12:00 pm', label: '12:00 PM', index: 6 },
    { value: '1:00 pm', label: '1:00 PM', index: 7 },
    { value: '2:00 pm', label: '2:00 PM', index: 8 }
  ];
};