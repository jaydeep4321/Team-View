"use client";

import React, { useState, useRef, useEffect } from "react";
import { ClientAppointment, useApp } from "@/contexts/AppContext";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import AppointmentModal from "./AppointmentModal";

// Draggable Appointment Component
const DraggableAppointment = ({
  appointment,
  style,
  onEdit,
}: {
  appointment: ClientAppointment;
  style: React.CSSProperties;
  onEdit: (appointment: ClientAppointment) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: appointment.id,
      data: { appointment },
    });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...dragStyle }}
      {...listeners}
      {...attributes}
      className="cursor-grab hover:shadow-lg transition-shadow"
      onDoubleClick={(e) => {
        e.stopPropagation();
        onEdit(appointment);
      }}
      title={`Double-click to edit • ${
        appointment.description || "No description"
      }`}
    >
      {/* Client Name */}
      <div className="flex flex-row items-center px-[5px] pt-[2px] gap-[10px] w-full h-[13px]">
        <span className="font-medium text-[9px] leading-[9px] text-[#232529] truncate">
          {appointment.clientName}
        </span>
      </div>

      {/* Client Time */}
      <div className="flex flex-row items-center px-[5px] pb-[2px] gap-[10px] w-full h-[13px]">
        <span className="font-normal text-[9px] leading-[9px] tracking-[-0.05em] text-[#232529] truncate">
          {appointment.time}
        </span>
      </div>
    </div>
  );
};

// Droppable Time Slot
const DroppableTimeSlot = ({
  timeIndex,
  memberIndex,
  children,
  onDoubleClick,
  slotWidth,
}: {
  timeIndex: number;
  memberIndex: number;
  children?: React.ReactNode;
  onDoubleClick: () => void;
  slotWidth: number;
}) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: `slot-${timeIndex}-${memberIndex}`,
    data: { timeIndex, memberIndex },
  });

  console.log({ active: active?.data.current });

  return (
    <div
      ref={setNodeRef}
      className={`absolute h-[32px] border border-transparent hover:bg-gray-50 cursor-pointer ${
        isOver ? "bg-blue-50 border-blue-300 border-dashed" : ""
      }`}
      style={{
        width: `${slotWidth * active?.data.current?.appointment?.duration}px`,
        left: `${timeIndex * slotWidth}px`,
        top: `${memberIndex * 32}px`,
      }}
      onDoubleClick={onDoubleClick}
      title="Double-click to create appointment"
    >
      {children}
    </div>
  );
};

export default function CalendarGrid() {
  const { appointments, updateAppointment, teamMembers, statusFilter, teamFilter } = useApp();
  
  // Filter appointments based on status and team
  const filteredAppointments = appointments.filter(appointment => {
    const statusMatch = statusFilter === "All" || appointment.status === statusFilter;
    const teamMatch = teamFilter === "All" || appointment.member.toString() === teamFilter;
    return statusMatch && teamMatch;
  });
  const timeSlots = [
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [slotWidth, setSlotWidth] = useState(71);

  // Auto-calculate slotWidth based on container width
  useEffect(() => {
    const updateSlotWidth = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        setSlotWidth(parentWidth / timeSlots.length);
      }
    };

    updateSlotWidth();

    const resizeObserver = new ResizeObserver(updateSlotWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [timeSlots.length]);

  const [selectedAppointment, setSelectedAppointment] =
    useState<ClientAppointment | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [newAppointmentSlot, setNewAppointmentSlot] = useState<{
    timeIndex: number;
    memberIndex: number;
  } | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.data.current) {
      const appointment = active.data.current.appointment;
      const dropData = over.data.current;

      if (dropData) {
        const startHour = dropData.timeIndex; // index in timeSlots
        const duration = appointment.duration; // keep same duration as before

        // Calculate new start/end times in display format
        const slotToTimeString = (slotIndex: number) => {
          const totalMinutes = 6 * 60 + slotIndex * 60; // starting at 6:00 AM
          let hour = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          const ampm = hour >= 12 ? "pm" : "am";
          hour = hour % 12 || 12;
          return `${hour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
        };

        const startTime = slotToTimeString(startHour);
        const endTime = slotToTimeString(startHour + duration);

        updateAppointment(appointment.id, {
          startHour,
          startTime,
          endTime,
          duration, // keep same width
          member: dropData.memberIndex + 1,
        });
      }
    }
  };

  const handleCreateAppointment = (timeIndex: number, memberIndex: number) => {
    setNewAppointmentSlot({ timeIndex, memberIndex });
    setModalMode("create");
    setSelectedAppointment(null);
  };

  const handleEditAppointment = (appointment: ClientAppointment) => {
    setSelectedAppointment(appointment);
    setModalMode("edit");
    setNewAppointmentSlot(null);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setNewAppointmentSlot(null);
  };

  const getAppointmentStyle = (appointment: ClientAppointment) => {
    const statusStyles = {
      completed: {
        background: "#EEF6FF",
        borderLeftColor: "#CBDDEE",
      },
      active: {
        background: "#FBF5FF",
        borderLeftColor: "#E8E3F5",
      },
      pending: {
        background: "#FEF7EC",
        borderLeftColor: "#EFD8C0",
      },
    };

    // If your slots are 1 hour each, duration is already in hours
    const eventWidth = appointment.duration * slotWidth;

    return {
      position: "absolute" as const,
      width: `${eventWidth - 6}px`, // span multiple slots
      height: "29px",
      borderRadius: "5px",
      borderLeft: "3px solid",
      left: `${180 + appointment.startHour * slotWidth + 2}px`, // offset by team column width
      top: `${67 + (appointment.member - 1) * 32 + 2}px`,
      padding: "0px",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center" as const,
      alignItems: "flex-start" as const,
      ...statusStyles[appointment.status],
    };
  };

  return (
    <div className="overflow-hidden">
      <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
        <div
          ref={containerRef}
          className="flex-1 relative bg-white overflow-x-auto overflow-y-auto min-h-[500px] mt-[-2.8%] "
        >
          {/* Team Members Column Header */}
          <div className="absolute top-[40px] left-0 w-[180px] h-7 bg-[#FFFFFF] border-b border-[#E0E0E0] flex items-center justify-start pl-4">
            <span className="font-bold text-xs text-[#232529]">Team</span>
          </div>

          {/* Time Header Row */}
          <div
            className="absolute top-[40px] h-7 bg-[#FAFAFA]"
            style={{
              left: "180px",
              width: `${timeSlots.length * slotWidth}px`,
            }}
          >
            {timeSlots.map((time, index) => (
              <div
                key={time}
                className="h-7 bg-[#FAFAFA] border-l border-b border-[#E0E0E0] flex justify-center items-center"
                style={{
                  width: `${slotWidth}px`,
                  left: `${index * slotWidth}px`,
                  position: "absolute",
                }}
              >
                <span className="font-normal text-xs leading-[9px] text-[#71717A]">
                  {time}
                </span>
              </div>
            ))}
          </div>

          {/* Main divider */}
          <div
            className="absolute h-px bg-[#EEEFF1] top-[39px]"
            style={{
              left: "0px",
              width: `${180 + timeSlots.length * slotWidth}px`,
            }}
          />

          {/* Team Members Column */}
          <div className="absolute top-[67px] left-0 w-[180px] bg-white">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="absolute flex items-center px-4 h-[32px] border-b border-[#E0E0E0] bg-white w-full"
                style={{ top: `${index * 32}px` }}
              >
                {/* Color Indicator */}
                <div
                  className="w-[10px] h-[10px] rounded-full mr-3"
                  style={{ backgroundColor: member.color }}
                />

                {/* Member Name */}
                <span className="font-normal text-xs text-[#232529] truncate">
                  {member.name}
                </span>
              </div>
            ))}
          </div>

          {/* Team column horizontal lines */}
          {Array.from({ length: teamMembers.length + 1 }, (_, i) => (
            <div
              key={`team-h-line-${i}`}
              className="absolute pointer-events-none"
              style={{
                top: `${67 + i * 32}px`,
                left: "0px",
                width: "180px",
                border: '0.8px solid #E0E0E0',
                height: 0,
              }}
            />
          ))}

          {/* Grid Container with Drop Zones */}
          <div
            className="absolute top-[67px] bottom-0"
            style={{
              left: "180px",
              width: `${timeSlots.length * slotWidth}px`,
            }}
          >
            {/* Drop Zones */}
            {timeSlots.map((_, timeIndex) =>
              teamMembers.map((_, memberIndex) => (
                <DroppableTimeSlot
                  key={`drop-${timeIndex}-${memberIndex}`}
                  timeIndex={timeIndex}
                  memberIndex={memberIndex}
                  slotWidth={slotWidth}
                  onDoubleClick={() =>
                    handleCreateAppointment(timeIndex, memberIndex)
                  }
                />
              ))
            )}

            {/* Horizontal Grid Lines */}
            {Array.from({ length: teamMembers.length + 1 }, (_, i) => (
              <div
                key={`h-line-${i}`}
                className="absolute left-0 pointer-events-none"
                style={{
                  top: `${i * 32}px`,
                  width: `${timeSlots.length * slotWidth}px`,
                  border: '0.8px solid #E0E0E0',
                  height: 0,
                }}
              />
            ))}

            {/* Vertical Grid Lines - Hour boundaries */}
            {timeSlots.map((_, index) => (
              <div
                key={`v-line-${index}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${index * slotWidth}px`,
                  top: "0px",
                  height: `${teamMembers.length * 32}px`,
                  border: '0.8px solid #B8B8B8',
                  width: 0,
                }}
              />
            ))}
            
            {/* Vertical Grid Lines - Half-hour middle lines (lighter) */}
            {timeSlots.map((_, index) => (
              <div
                key={`v-middle-line-${index}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${index * slotWidth + slotWidth / 2}px`,
                  top: "0px",
                  height: `${teamMembers.length * 32}px`,
                  border: '0.8px solid #E0E0E0',
                  width: 0,
                }}
              />
            ))}
            
            {/* Add final vertical line at the end */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${timeSlots.length * slotWidth}px`,
                top: "0px",
                height: `${teamMembers.length * 32}px`,
                border: '0.8px solid #B8B8B8',
                width: 0,
              }}
            />
          </div>

          {/* Vertical divider between team column and calendar */}
          <div
            className="absolute w-px bg-[#E0E0E0] top-[40px]"
            style={{
              left: "180px",
              height: `${teamMembers.length * 32 + 27}px`,
            }}
          />

          {/* Draggable Appointments */}
          {filteredAppointments.map((appointment) => (
            <DraggableAppointment
              key={appointment.id}
              appointment={appointment}
              style={getAppointmentStyle(appointment)}
              onEdit={handleEditAppointment}
            />
          ))}
        </div>

        {/* Appointment Modal */}
        <AppointmentModal
          isOpen={!!(selectedAppointment || newAppointmentSlot)}
          onClose={closeModal}
          appointment={selectedAppointment}
          defaultTimeSlot={newAppointmentSlot ?? undefined}
          mode={modalMode}
        />
      </DndContext>
    </div>
  );
}
