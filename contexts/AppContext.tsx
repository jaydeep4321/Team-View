"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface TeamMember {
  id: number;
  name: string;
  color: string;
}

export interface ClientAppointment {
  id: string;
  clientName: string;
  time: string;
  startHour: number;
  duration: number;
  status: "completed" | "active" | "pending";
  member: number;
  startTime?: string;
  endTime?: string;
  description?: string;
}

export interface Job {
  id: string;
  name: string;
  address: string;
  jobId: string;
  assignedMember?: number;
  priority?: "high" | "medium" | "low";
  estimatedDuration?: number;
}

interface AppContextType {
  // Team Members
  teamMembers: TeamMember[];
  setTeamMembers: (members: TeamMember[]) => void;

  // Appointments
  appointments: ClientAppointment[];
  setAppointments: (appointments: ClientAppointment[]) => void;
  addAppointment: (appointment: ClientAppointment) => void;
  updateAppointment: (id: string, updates: Partial<ClientAppointment>) => void;
  deleteAppointment: (id: string) => void;

  // Jobs
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  assignJobToMember: (jobId: string, memberId: number) => void;

  // UI State
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  teamFilter: string;
  setTeamFilter: (filter: string) => void;
  assignedFilter: string;
  setAssignedFilter: (filter: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  timeInterval: string;
  setTimeInterval: (interval: string) => void;

  // Drag and Drop
  draggedItem: { type: string; data: any } | null;
  setDraggedItem: (item: { type: string; data: any } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Team Members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Alex Johnson", color: "#F5A623" },
    { id: 2, name: "Sarah Wilson", color: "#9AE095" },
    { id: 3, name: "Mike Davis", color: "#74EBE1" },
    { id: 4, name: "Emma Brown", color: "#9EE1FF" },
    { id: 5, name: "Tom Garcia", color: "#A0C6FF" },
    { id: 6, name: "Lisa Miller", color: "#A0FFB5" },
    { id: 7, name: "John Taylor", color: "#FFA0F9" },
    { id: 8, name: "Amy Anderson", color: "#FFE1A0" },
    { id: 9, name: "Chris Moore", color: "#FFA0A0" },
    { id: 10, name: "Kate White", color: "#C0A0FF" },
    { id: 11, name: "David Lee", color: "#FFFFA0" },
  ]);

  // Appointments
  const [appointments, setAppointments] = useState<ClientAppointment[]>([
    {
      id: "1",
      clientName: "Hello",
      time: "10:00 am - 12:30 am",
      startTime: "10:00 am",
      endTime: "10:30 am",
      startHour: 4,
      duration: 4,
      status: "completed",
      member: 1,
      description: "Website maintenance",
    },
    {
      id: "2",
      clientName: "TechStart Inc",
      time: "8:00 am - 8:30 am",
      startTime: "8:00 am",
      endTime: "8:30 am",
      startHour: 2,
      duration: 0.5,
      status: "completed",
      member: 2,
      description: "System setup consultation",
    },
    {
      id: "3",
      clientName: "Global Solutions",
      time: "9:00 am - 9:30 am",
      startTime: "9:00 am",
      endTime: "9:30 am",
      startHour: 3,
      duration: 0.5,
      status: "active",
      member: 3,
      description: "Network security review",
    },
    {
      id: "4",
      clientName: "Digital Media Co",
      time: "11:00 am - 11:30 am",
      startTime: "11:00 am",
      endTime: "11:30 am",
      startHour: 5,
      duration: 0.5,
      status: "active",
      member: 4,
      description: "Content management system",
    },
    {
      id: "5",
      clientName: "Finance Plus",
      time: "1:00 pm - 1:45 pm",
      startTime: "1:00 pm",
      endTime: "1:45 pm",
      startHour: 7,
      duration: 0.75,
      status: "completed",
      member: 5,
      description: "Database migration",
    },
    {
      id: "6",
      clientName: "Marketing Hub",
      time: "12:00 pm - 12:30 pm",
      startTime: "12:00 pm",
      endTime: "12:30 pm",
      startHour: 6,
      duration: 0.5,
      status: "pending",
      member: 6,
      description: "Analytics setup",
    },
    {
      id: "7",
      clientName: "Retail Chain",
      time: "7:00 am - 7:30 am",
      startTime: "7:00 am",
      endTime: "7:30 am",
      startHour: 1,
      duration: 0.5,
      status: "completed",
      member: 7,
      description: "POS system integration",
    },
    {
      id: "8",
      clientName: "Tech Solutions",
      time: "3:00 pm - 4:00 pm",
      startTime: "3:00 pm",
      endTime: "4:00 pm",
      startHour: 9,
      duration: 1,
      status: "pending",
      member: 8,
      description: "Cloud migration planning",
    },
    {
      id: "9",
      clientName: "Healthcare Group",
      time: "4:30 pm - 5:15 pm",
      startTime: "4:30 pm",
      endTime: "5:15 pm",
      startHour: 10,
      duration: 0.75,
      status: "active",
      member: 9,
      description: "System security audit",
    },
    {
      id: "10",
      clientName: "Education Corp",
      time: "5:30 pm - 6:00 pm",
      startTime: "5:30 pm",
      endTime: "6:00 pm",
      startHour: 11,
      duration: 0.5,
      status: "pending",
      member: 10,
      description: "Learning management system",
    },
  ]);

  // Jobs
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      name: "Cameron Williamson",
      address: "4140 Parker Rd, Allentown, New Mexico 31134",
      jobId: "JOB106731",
      priority: "high",
      estimatedDuration: 2,
    },
    {
      id: "2",
      name: "Brooklyn Simmons",
      address: "2715 Ash Dr. San Jose, South Dakota 83475",
      jobId: "JOB106732",
      priority: "medium",
      estimatedDuration: 1.5,
    },
    {
      id: "3",
      name: "Leslie Alexander",
      address: "6391 Elgin St. Celina, Delaware 10299",
      jobId: "JOB106733",
      priority: "low",
      estimatedDuration: 1,
    },
    {
      id: "4",
      name: "Jerome Bell",
      address: "8502 Preston Rd. Inglewood, Maine 98380",
      jobId: "JOB106734",
      assignedMember: 3,
      priority: "medium",
      estimatedDuration: 3,
    },
  ]);

  // UI State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState("Team View");
  const [statusFilter, setStatusFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("Assigned");
  const [viewMode, setViewMode] = useState("Day");
  const [timeInterval, setTimeInterval] = useState("1 hour");

  // Drag and Drop
  const [draggedItem, setDraggedItem] = useState<{
    type: string;
    data: any;
  } | null>(null);

  // Appointment functions
  const addAppointment = (appointment: ClientAppointment) => {
    setAppointments((prev) => [
      ...prev,
      { ...appointment, id: Date.now().toString() },
    ]);
  };

  const updateAppointment = (
    id: string,
    updates: Partial<ClientAppointment>
  ) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, ...updates } : appointment
      )
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
  };

  const assignJobToMember = (jobId: string, memberId: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, assignedMember: memberId } : job
      )
    );
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("teamCalendarData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.appointments) setAppointments(parsed.appointments);
        if (parsed.jobs) setJobs(parsed.jobs);
        if (parsed.teamMembers) setTeamMembers(parsed.teamMembers);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    const dataToSave = {
      appointments,
      jobs,
      teamMembers,
      selectedDate: selectedDate.toISOString(),
      activeView,
      statusFilter,
      teamFilter,
      assignedFilter,
    };
    localStorage.setItem("teamCalendarData", JSON.stringify(dataToSave));
  }, [
    appointments,
    jobs,
    teamMembers,
    selectedDate,
    activeView,
    statusFilter,
    teamFilter,
    assignedFilter,
  ]);

  const value: AppContextType = {
    // Team Members
    teamMembers,
    setTeamMembers,

    // Appointments
    appointments,
    setAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,

    // Jobs
    jobs,
    setJobs,
    assignJobToMember,

    // UI State
    selectedDate,
    setSelectedDate,
    activeView,
    setActiveView,
    statusFilter,
    setStatusFilter,
    teamFilter,
    setTeamFilter,
    assignedFilter,
    setAssignedFilter,
    viewMode,
    setViewMode,
    timeInterval,
    setTimeInterval,

    // Drag and Drop
    draggedItem,
    setDraggedItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
