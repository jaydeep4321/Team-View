"use client";

import React, { useState } from "react";
import { AppProvider, useApp } from "@/contexts/AppContext";
import CalendarGrid from "@/components/CalendarGrid";
import JobCards from "@/components/JobCards";
import ErrorBoundary from "@/components/ErrorBoundary";

function AppContent() {
  const {
    selectedDate,
    setSelectedDate,
    statusFilter,
    setStatusFilter,
    teamFilter,
    setTeamFilter,
    teamMembers,
    timeInterval,
    setTimeInterval,
    viewMode,
    setViewMode,
  } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-opacity-30 backdrop-blur-[11.75px]">
      <div className="w-full h-screen bg-white rounded-b-[15px] relative flex flex-col">
        {/* Header - Only main header part */}
        <div className="relative w-full bg-white rounded-t-[15px]">
          {/* Main Header */}
          <div className="flex flex-row items-center px-4 md:px-6 py-2.5 w-full h-12 bg-white rounded-t-[15px] relative">
            {/* Date Picker Section - Left */}
            <div className="flex flex-row justify-center items-center gap-1 min-w-[120px] md:w-[158px] h-7">
              {/* Left Arrow */}
              <button
                className="flex items-center justify-center w-[22px] h-6 rounded-r-[5px] transform scale-x-[-1] hover:bg-gray-100 transition-colors"
                onClick={() => {
                  const prevMonth = new Date(selectedDate);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  setSelectedDate(prevMonth);
                }}
                aria-label="Previous month"
              >
                <div className="w-4 h-4 transform scale-x-[-1] rotate-180">
                  <svg viewBox="0 0 16 16" className="w-full h-full">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="#524F51"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* Date Text */}
              <span className="font-medium text-sm md:text-base leading-5 text-[#232529] flex items-center truncate">
                November 2024
              </span>
            </div>

            {/* View Options - Centered on desktop, hidden on mobile */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 flex-row justify-center items-center gap-2 md:gap-4 h-6">
              {["Events", "Team View", "Team Tracking"].map((view) => (
                <button
                  key={view}
                  className={`flex flex-row justify-center items-center px-1 md:px-2 gap-1 h-6 rounded-[7px] transition-all hover:bg-gray-50 ${
                    view === "Team View"
                      ? "bg-[#FAFAFA] border border-[#EEEFF1]"
                      : "border-none hover:border hover:border-gray-200"
                  }`}
                >
                  <span
                    className={`font-normal text-xs leading-4 flex items-center tracking-[-0.24px] truncate ${
                      view === "Team View" ? "text-[#232529]" : "text-[#667085]"
                    }`}
                  >
                    {view}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden absolute right-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#EEEFF1]" />
        </div>

        {/* Content Area with Secondary Header and JobCards */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Secondary Controls */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 md:px-6 py-3 gap-3 md:gap-0 min-h-[52px] border-b border-[#EEEFF1]">
              {/* Left Side - Status and Team Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none flex items-center gap-1 px-3 py-[5px]  h-7 rounded-lg bg-white border-none font-medium text-xs text-[#232529] cursor-pointer focus:outline-none"
                    aria-label="Filter by status"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 5.25L7 8.75L10.5 5.25' stroke='%235C5E63' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 6px center",
                      backgroundSize: "12px 12px",
                    }}
                  >
                    <option value="All">Status</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={teamFilter}
                    onChange={(e) => setTeamFilter(e.target.value)}
                    className="appearance-none flex items-center gap-1 px-3 py-[5px] h-7 rounded-lg bg-white border-none font-medium text-xs text-[#232529] cursor-pointer focus:outline-none"
                    aria-label="Filter by team member"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 5.25L7 8.75L10.5 5.25' stroke='%235C5E63' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 6px center",
                      backgroundSize: "12px 12px",
                    }}
                  >
                    <option value="All">Team</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id.toString()}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Side - Time Controls */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <select
                    value={timeInterval}
                    onChange={(e) => setTimeInterval(e.target.value)}
                    className="appearance-none flex items-center gap-1 px-3 py-[5px] w-[78px] h-7 rounded-lg bg-white border-none font-medium text-xs text-[#232529] cursor-pointer focus:outline-none whitespace-nowrap"
                    aria-label="Select time interval"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 5.25L7 8.75L10.5 5.25' stroke='%235C5E63' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 6px center",
                      backgroundSize: "12px 12px",
                    }}
                  >
                    <option value="30 min">30 min</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hour">2 hour</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                    className="appearance-none flex items-center gap-1 px-3 py-[5px] w-[70px] h-7 rounded-lg bg-white border-none font-medium text-xs text-[#232529] cursor-pointer focus:outline-none"
                    aria-label="Select view mode"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3.5 5.25L7 8.75L10.5 5.25' stroke='%235C5E63' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 6px center",
                      backgroundSize: "12px 12px",
                    }}
                  >
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => {
                      const prevDate = new Date(selectedDate);
                      prevDate.setDate(prevDate.getDate() - 1);
                      setSelectedDate(prevDate);
                    }}
                    className="w-[22px] h-6 bg-[#F4F4F5] rounded-l-[5px] flex items-center justify-center hover:bg-[#EEEFF1] transition-colors"
                    aria-label="Previous day"
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4">
                      <path
                        d="M10 12L6 8L10 4"
                        stroke="#000000"
                        strokeWidth="1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="px-3 h-6 bg-[#F4F4F5] flex items-center justify-center hover:bg-[#EEEFF1] transition-colors"
                    aria-label="Go to today"
                  >
                    <span className="font-normal text-[13px] text-black">
                      Today
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const nextDate = new Date(selectedDate);
                      nextDate.setDate(nextDate.getDate() + 1);
                      setSelectedDate(nextDate);
                    }}
                    className="w-[22px] h-6 bg-[#F4F4F5] rounded-r-[5px] flex items-center justify-center hover:bg-[#EEEFF1] transition-colors"
                    aria-label="Next day"
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4">
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="#000000"
                        strokeWidth="1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 -mt-px">
              <ErrorBoundary>
                <CalendarGrid />
              </ErrorBoundary>
            </div>
          </div>

          {/* Job Cards Sidebar - starts from after main header */}
          <div className="hidden xl:block flex-shrink-0">
            <ErrorBoundary>
              <JobCards />
            </ErrorBoundary>
          </div>

          {/* Mobile Job Cards - Shows as bottom sheet on mobile */}
          <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EEEFF1] max-h-[40vh] overflow-y-auto">
            <details className="w-full">
              <summary className="px-4 py-3 cursor-pointer flex justify-between items-center">
                <span className="font-medium text-sm text-[#232529]">
                  Job Cards
                </span>
                <svg className="w-4 h-4" viewBox="0 0 16 16">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#667085"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="pb-safe">
                <ErrorBoundary>
                  <JobCards />
                </ErrorBoundary>
              </div>
            </details>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-[11.75px] transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div
            className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEEFF1]">
              <h2 className="font-semibold text-lg text-[#232529]">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="px-6 py-6">
              {/* View Options */}
              <div className="mb-6">
                <h3 className="font-medium text-sm text-[#667085] mb-3 uppercase tracking-wide">
                  View Options
                </h3>
                <div className="space-y-2">
                  {["Events", "Team View", "Team Tracking"].map((view) => (
                    <button
                      key={view}
                      onClick={() => {
                        // Handle view change here if needed
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all ${
                        view === "Team View"
                          ? "bg-[#FAFAFA] border border-[#EEEFF1] text-[#232529]"
                          : "text-[#667085] hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-normal text-sm">{view}</span>
                      {view === "Team View" && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-[#232529]"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </AppProvider>
    </ErrorBoundary>
  );
}
