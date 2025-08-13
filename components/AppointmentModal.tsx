'use client';

import React, { useState, useEffect } from 'react';
import { useApp, ClientAppointment } from '@/contexts/AppContext';
import { checkAppointmentConflict, calculateEndTime, generateTimeSlots } from '@/utils/appointmentUtils';
import ConfirmDialog from './ConfirmDialog';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: ClientAppointment | null;
  defaultTimeSlot?: { timeIndex: number; memberIndex: number };
  mode: 'create' | 'edit';
}

export default function AppointmentModal({ 
  isOpen, 
  onClose, 
  appointment, 
  defaultTimeSlot,
  mode 
}: AppointmentModalProps) {
  const { addAppointment, updateAppointment, deleteAppointment, teamMembers, appointments } = useApp();
  type AppointmentStatus = 'completed' | 'active' | 'pending';
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [formData, setFormData] = useState<{ 
    clientName: string;
    startTime: string;
    duration: string;
    status: AppointmentStatus;
    member: number;
    description: string;
    startHour: number;
  }>({
    clientName: '',
    startTime: '9:00 am',
    duration: '1',
    status: 'pending' as AppointmentStatus,
    member: 1,
    description: '',
    startHour: 3
  });

  const [conflicts, setConflicts] = useState<{ hasConflict: boolean; conflictingAppointments: ClientAppointment[] }>({ 
    hasConflict: false, 
    conflictingAppointments: [] 
  });

  const timeOptions = generateTimeSlots();

  // Update form data when modal opens or appointment changes (but not when user is editing)
  useEffect(() => {
    if (!isOpen) return; // Only run when modal is open
    
    if (appointment && mode === 'edit') {
      // Find the correct time format for the dropdown
      const timeOption = timeOptions.find(t => t.index === appointment.startHour);
      const formattedStartTime = timeOption ? timeOption.value : appointment.startTime || '9:00 am';
      
      setFormData({
        clientName: appointment.clientName || '',
        startTime: formattedStartTime,
        duration: appointment.duration?.toString() || '1',
        status: (appointment.status || 'pending') as AppointmentStatus,
        member: appointment.member || 1,
        description: appointment.description || '',
        startHour: appointment.startHour || 3
      });
    } else if (mode === 'create' && defaultTimeSlot) {
      // For create mode, use the time slot from the calendar
      const timeOption = timeOptions.find(t => t.index === defaultTimeSlot.timeIndex);
      const formattedStartTime = timeOption ? timeOption.value : '9:00 am';
      
      setFormData({
        clientName: '',
        startTime: formattedStartTime,
        duration: '1',
        status: 'pending' as AppointmentStatus,
        member: defaultTimeSlot.memberIndex + 1,
        description: '',
        startHour: defaultTimeSlot.timeIndex
      });
    } else if (mode === 'create') {
      // Default create mode
      setFormData({
        clientName: '',
        startTime: '9:00 am',
        duration: '1',
        status: 'pending' as AppointmentStatus,
        member: 1,
        description: '',
        startHour: 3
      });
    }
  }, [isOpen, appointment?.id, mode]); // Only depend on modal open state, appointment ID, and mode

  // Check for conflicts whenever relevant form data changes
  useEffect(() => {
    const conflictCheck = checkAppointmentConflict({
      member: formData.member,
      startHour: formData.startHour
    }, appointments, appointment?.id);
    
    setConflicts(conflictCheck);
  }, [formData.member, formData.startHour, appointments, appointment?.id]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.clientName.trim()) {
      alert('Please enter a client name.');
      return;
    }
    
    if (formData.duration === '' || parseFloat(formData.duration) <= 0) {
      alert('Please enter a valid duration.');
      return;
    }
    
    if (parseFloat(formData.duration) > 8) {
      alert('Duration cannot exceed 8 hours.');
      return;
    }
    
    // Prevent saving if there are conflicts
    if (conflicts.hasConflict) {
      alert('Cannot save appointment due to scheduling conflicts. Please choose a different time or team member.');
      return;
    }
    
    const endTime = calculateEndTime(formData.startTime, parseFloat(formData.duration));
    const timeOption = timeOptions.find(t => t.value === formData.startTime);
    
    // Check if appointment extends beyond working hours (6pm)
    const startHour = timeOption?.index || 3;
    const endHour = startHour + parseFloat(formData.duration);
    if (endHour > 12) { // 12 = 6pm (last slot index)
      alert('Appointment extends beyond working hours (6:00 PM). Please reduce duration or select an earlier time.');
      return;
    }
    
    const appointmentData: Partial<ClientAppointment> = {
      clientName: formData.clientName.trim(),
      time: `${formData.startTime} - ${endTime}`,
      startTime: formData.startTime,
      endTime,
      startHour: timeOption?.index || 3,
      duration: parseFloat(formData.duration),
      status: formData.status as 'completed' | 'active' | 'pending',
      member: formData.member,
      description: formData.description
    };

    if (mode === 'create') {
      addAppointment({
        ...appointmentData,
        id: Date.now().toString()
      } as ClientAppointment);
    } else if (appointment) {
      updateAppointment(appointment.id, appointmentData);
    }

    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    if (appointment) {
      deleteAppointment(appointment.id);
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-[11.75px] flex items-center justify-center z-50">
      <div className="bg-white rounded-[15px] p-6 w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto shadow-lg">
        <h3 className="font-semibold text-lg text-[#232529] mb-4">
          {mode === 'create' ? 'Create New Appointment' : 'Edit Appointment'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">Client Name</label>
            <input 
              type="text" 
              required
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Enter client name"
            />
          </div>
          
          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">Assign to Team Member</label>
            <select 
              value={formData.member} 
              onChange={(e) => setFormData({ ...formData, member: Number(e.target.value) })}
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
            >
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>
                  <span style={{ color: member.color }}>●</span> {member.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-sm text-[#232529] mb-2">Start Time</label>
              <select 
                value={formData.startTime} 
                onChange={(e) => {
                  const timeOption = timeOptions.find(t => t.value === e.target.value);
                  setFormData({ 
                    ...formData, 
                    startTime: e.target.value,
                    startHour: timeOption?.index || 3
                  });
                }}
                className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
              >
                {timeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block font-medium text-sm text-[#232529] mb-2">Duration (hours)</label>
              <input 
                type="number" 
                step="0.5" 
                min="0.5" 
                max="8" 
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">Status</label>
            <select 
              value={formData.status} 
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as AppointmentStatus })}
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">Description (Optional)</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
              rows={3}
              placeholder="Enter appointment details..."
            />
          </div>
          
          {/* Conflict Warning */}
          {conflicts.hasConflict && (
            <div className="bg-red-50 border border-red-200 p-3 rounded">
              <div className="flex items-center gap-2">
                <span className="text-red-600 text-sm font-medium">⚠️ Scheduling Conflict</span>
              </div>
              <p className="text-red-600 text-sm mt-1">
                This time slot is already occupied by:
              </p>
              {conflicts.conflictingAppointments.map(conflict => (
                <div key={conflict.id} className="text-red-600 text-sm ml-4">
                  • {conflict.clientName} ({conflict.time})
                </div>
              ))}
              <p className="text-red-600 text-sm mt-2">
                Please select a different time or team member.
              </p>
            </div>
          )}
          
          <div className={`text-sm p-3 rounded ${
            conflicts.hasConflict ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50'
          }`}>
            <strong>Preview:</strong> {formData.clientName || 'New Client'} 
            {formData.startTime && ` from ${formData.startTime} to ${calculateEndTime(formData.startTime, parseFloat(formData.duration || '1'))}`}
            <br />
            <small>
              Assigned to: {teamMembers.find(m => m.id === formData.member)?.name}
            </small>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={conflicts.hasConflict}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                conflicts.hasConflict 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#232529] text-white hover:bg-[#1a1a1a]'
              }`}
            >
              {mode === 'create' ? 'Create Appointment' : 'Update Appointment'}
            </button>
            
            {mode === 'edit' && (
              <button 
                type="button" 
                onClick={handleDelete}
                className="bg-red-500 text-white py-3 px-4 rounded-lg font-medium text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
            
            <button 
              type="button" 
              onClick={onClose}
              className="bg-[#FAFAFA] text-[#667085] border border-[#EEEFF1] py-3 px-4 rounded-lg font-medium text-sm hover:bg-[#F0F0F0] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <ConfirmDialog
      isOpen={showDeleteConfirm}
      title="Delete Appointment"
      message={`Are you sure you want to delete the appointment for ${appointment?.clientName}? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={confirmDelete}
      onCancel={() => setShowDeleteConfirm(false)}
      isDestructive={true}
    />
    </>
  );
}