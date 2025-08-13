'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp, Job } from '@/contexts/AppContext';
import { calculateEndTime } from '@/utils/appointmentUtils';

// Modal for creating new appointment
const CreateAppointmentModal = ({
  isOpen,
  onClose,
  job,
}: {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}) => {
  const { addAppointment, teamMembers } = useApp();
  const [selectedMember, setSelectedMember] = useState(1);
  const [selectedTime, setSelectedTime] = useState('9:00 am');
  const [duration, setDuration] = useState('1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert selected time to hour index
    const timeMap: { [key: string]: number } = {
      '6:00 am': 0,
      '7:00 am': 1,
      '8:00 am': 2,
      '9:00 am': 3,
      '10:00 am': 4,
      '11:00 am': 5,
      '12:00 pm': 6,
      '1:00 pm': 7,
      '2:00 pm': 8,
    };

    const endTime = calculateEndTime(selectedTime, parseFloat(duration));
    const appointment = {
      id: Date.now().toString(),
      clientName: job.name,
      time: `${selectedTime} - ${endTime}`,
      startTime: selectedTime,
      endTime,
      startHour: timeMap[selectedTime] || 3,
      duration: parseFloat(duration),
      status: 'pending' as const,
      member: selectedMember,
      description: `Job: ${job.jobId}`,
    };

    addAppointment(appointment);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[11.75px] flex items-center justify-center z-50">
      <div className="bg-white rounded-[15px] p-6 w-96 max-w-[90vw] shadow-lg">
        <h3 className="font-semibold text-lg text-[#232529] mb-4">
          Create Appointment
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">
              Client
            </label>
            <input
              type="text"
              value={job?.name || ''}
              disabled
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-[#FAFAFA] text-[#667085] font-normal text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">
              Assign to
            </label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(Number(e.target.value))}
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
            >
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">
              Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="6:00 am">6:00 AM</option>
              <option value="7:00 am">7:00 AM</option>
              <option value="8:00 am">8:00 AM</option>
              <option value="9:00 am">9:00 AM</option>
              <option value="10:00 am">10:00 AM</option>
              <option value="11:00 am">11:00 AM</option>
              <option value="12:00 pm">12:00 PM</option>
              <option value="1:00 pm">1:00 PM</option>
              <option value="2:00 pm">2:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm text-[#232529] mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="4"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-[#EEEFF1] rounded-lg bg-white text-[#232529] font-normal text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#232529] text-white py-3 px-4 rounded-lg font-medium text-sm hover:bg-[#1a1a1a] transition-colors"
            >
              Create Appointment
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#FAFAFA] text-[#667085] border border-[#EEEFF1] py-3 px-4 rounded-lg font-medium text-sm hover:bg-[#F0F0F0] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function JobCards() {
  const { jobs, teamMembers, assignedFilter, setAssignedFilter } = useApp();
  const [modalJob, setModalJob] = useState<Job | null>(null);

  const handleAssignAll = () => {
    // Create appointments for all unassigned jobs
    jobs
      .filter((job) => !job.assignedMember)
      .forEach((job) => {
        setModalJob(job);
      });
  };

  // Filter jobs based on assigned/unassigned status
  const filteredJobs = jobs.filter((job) => {
    if (assignedFilter === 'Assigned') return job.assignedMember;
    if (assignedFilter === 'Unassigned') return !job.assignedMember;
    return true;
  });

  return (
    <>
      <div className="w-[280px] h-full bg-white border-l border-[#EEEFF1] flex flex-col">
        {/* Assigned/Unassigned Tabs */}
        <div className="flex justify-center items-center gap-2 py-3 border-b border-[#EEEFF1]">
          <button
            onClick={() => setAssignedFilter('Assigned')}
            className={`flex flex-row justify-center items-center px-2 gap-1 h-6 rounded-[7px] transition-all hover:bg-gray-50 ${
              assignedFilter === 'Assigned'
                ? 'bg-[#FAFAFA] border border-[#EEEFF1]'
                : 'border-none hover:border hover:border-gray-200'
            }`}
          >
            <span
              className={`font-normal text-xs leading-4 flex items-center tracking-[-0.24px] truncate ${
                assignedFilter === 'Assigned'
                  ? 'text-[#232529]'
                  : 'text-[#667085]'
              }`}
            >
              Assigned
            </span>
          </button>

          <button
            onClick={() => setAssignedFilter('Unassigned')}
            className={`flex flex-row justify-center items-center px-2 gap-1 h-6 rounded-[7px] transition-all hover:bg-gray-50 ${
              assignedFilter === 'Unassigned'
                ? 'bg-[#FAFAFA] border border-[#EEEFF1]'
                : 'border-none hover:border hover:border-gray-200'
            }`}
          >
            <span
              className={`font-normal text-xs leading-4 flex items-center tracking-[-0.24px] truncate ${
                assignedFilter === 'Unassigned'
                  ? 'text-[#232529]'
                  : 'text-[#667085]'
              }`}
            >
              Unassigned
            </span>
          </button>
        </div>
        {/* Assign All Button */}
        <div className="px-4 py-4">
          <button
            onClick={handleAssignAll}
            className="w-full h-7 bg-[#FAFAFA] border border-[#EEEFF1] rounded-md flex flex-row items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-sm text-[#232529] whitespace-nowrap">
              Assign All
            </span>
            <div className="w-[13px] h-[13px] relative shrink-0">
              <Image src="/star.svg" alt="Start" width={13} height={13} />
            </div>
          </button>
        </div>

        {/* Job Cards */}
        <div className="flex flex-col px-4 overflow-y-auto">
          {filteredJobs.map((job, index) => {
            const assignedMember = job.assignedMember
              ? teamMembers.find((m) => m.id === job.assignedMember)
              : null;

            return (
              <div key={job.id} className="py-4">
                {/* Job Header */}
                <div className="flex flex-row justify-between items-start gap-4">
                  {/* Job Info */}
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="font-medium text-sm leading-[13px] tracking-[-0.0024em] text-[#232529]">
                      {job.name}
                    </span>
                    <p className="font-normal text-[13px] leading-[13px] tracking-[-0.0024em] text-[#667085]">
                      {job.address}
                    </p>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-col items-end gap-3 min-w-[73px]">
                    <span className="font-normal text-[13px] leading-4 tracking-[-0.0024em] text-[#667085] text-right">
                      {job.jobId}
                    </span>

                    {/* Assign Button */}
                    <button
                      onClick={() => setModalJob(job)}
                      className={`border rounded-[7px] px-2 h-5 flex items-center justify-center transition-colors ${
                        assignedMember
                          ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                          : 'bg-[#FAFAFA] border-[#EEEFF1] text-[#232529] hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-normal text-xs leading-4 tracking-[-0.24px]">
                        {assignedMember ? 'Scheduled' : 'Assign'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Divider between job cards (except last) */}
                {index < filteredJobs.length - 1 && (
                  <div className="w-full h-px bg-[#EEEFF1] mt-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Appointment Modal */}
      <CreateAppointmentModal
        isOpen={!!modalJob}
        onClose={() => setModalJob(null)}
        job={modalJob as Job}
      />
    </>
  );
}
