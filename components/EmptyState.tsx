'use client';

import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export default function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      {icon && (
        <div className="mb-4 text-[#667085]">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-lg text-[#232529] mb-2">{title}</h3>
      <p className="text-sm text-[#667085] mb-6 max-w-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-[#232529] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#1a1a1a] transition-colors"
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}