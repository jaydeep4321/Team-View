"use client";

import React from "react";
import { useApp } from "@/contexts/AppContext";

export default function TeamSidebar() {
  const { teamMembers } = useApp();

  return (
    <div className="w-[180px] h-full bg-white flex flex-col relative">
      {/* Team Header */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="font-medium text-base leading-[13px] text-[#232529] mb-4">
          Team
        </h2>

        {/* Divider */}
        <div className="w-[179px] h-px bg-[#71717A] opacity-20 mb-4" />

        {/* Team Members List */}
        <div className="flex flex-col gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-row items-center gap-2">
              {/* Color Indicator */}
              <div
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: member.color }}
              />

              {/* Member Name */}
              <span className="font-normal text-[13px] leading-4 text-[#232529]">
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
