"use client";

import React from "react";
import { useApp } from "@/contexts/AppContext";

export default function Header() {
  const { selectedDate, setSelectedDate, activeView, setActiveView } = useApp();
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const viewOptions = ["Events", "Team View", "Team Tracking"];

  return (
    <div className="relative w-full h-[100px] bg-white rounded-t-[15px] overflow-visible">
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
          >
            <div className="w-4 h-4 transform scale-x-[-1]">
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
            {formatDate(selectedDate)}
          </span>
        </div>

        {/* View Options - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row justify-center items-center gap-2 md:gap-4 h-6">
          {viewOptions.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`flex flex-row justify-center items-center px-1 md:px-2 gap-1 h-6 rounded-[7px] transition-all hover:bg-gray-50 ${
                activeView === view
                  ? "bg-[#FAFAFA] border border-[#EEEFF1]"
                  : "border-none hover:border hover:border-gray-200"
              }`}
            >
              <span
                className={`font-normal text-xs leading-4 flex items-center tracking-[-0.24px] truncate ${
                  activeView === view ? "text-[#232529]" : "text-[#667085]"
                }`}
              >
                {view}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#EEEFF1]" />

      {/* Secondary Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 py-3 gap-3 md:gap-0 h-auto md:h-[52px]">
        {/* Left Side - Team Filter */}
        <div className="flex items-center gap-4 order-2 md:order-1">
          <button className="flex flex-row justify-center items-center px-2 py-[5px] w-[74px] h-7 rounded-lg">
            <div className="flex items-center gap-1">
              <span className="font-medium text-xs text-[#232529]">Team</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <svg viewBox="0 0 14 14" className="w-[14px] h-[14px]">
                  <path
                    d="M3.5 5.25L7 8.75L10.5 5.25"
                    stroke="#5C5E63"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Right Side - Status Filters & Time Controls */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 order-1 md:order-2">
          {/* Day Controls */}
          <div className="flex items-center gap-2">
            <button className="flex flex-row justify-center items-center px-2 py-[5px] w-[59px] h-7 rounded-lg">
              <div className="flex items-center gap-1">
                <span className="font-medium text-xs text-[#232529]">Day</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 14 14" className="w-[14px] h-[14px]">
                    <path
                      d="M3.5 5.25L7 8.75L10.5 5.25"
                      stroke="#5C5E63"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </button>

            {/* Time Dropdown */}
            <button className="flex flex-row justify-center items-center px-2 py-[5px] w-[68px] h-7 rounded-lg">
              <div className="flex items-center gap-1">
                <span className="font-medium text-xs text-[#232529]">
                  1 hour
                </span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 14 14" className="w-[14px] h-[14px]">
                    <path
                      d="M3.5 5.25L7 8.75L10.5 5.25"
                      stroke="#5C5E63"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </button>

            {/* Today Navigation */}
            <div className="flex items-center">
              <button className="w-[22px] h-6 bg-[#F4F4F5] rounded-l-[5px] flex items-center justify-center">
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
              <button className="px-3 h-6 bg-[#F4F4F5] flex items-center justify-center">
                <span className="font-normal text-[13px] text-black">
                  Today
                </span>
              </button>
              <button className="w-[22px] h-6 bg-[#F4F4F5] rounded-r-[5px] flex items-center justify-center">
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
      </div>
    </div>
  );
}
