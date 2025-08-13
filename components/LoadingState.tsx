'use client';

import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="w-10 h-10 border-3 border-[#232529] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-[#667085] font-normal">{message}</p>
    </div>
  );
}