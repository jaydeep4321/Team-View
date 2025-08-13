'use client';

import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[11.75px] flex items-center justify-center z-[100]">
      <div className="bg-white rounded-[15px] p-6 max-w-sm w-full mx-4 shadow-lg">
        <h3 className="font-semibold text-lg text-[#232529] mb-3">{title}</h3>
        <p className="font-normal text-sm text-[#667085] mb-6">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-[#FAFAFA] text-[#667085] border border-[#EEEFF1] py-3 px-4 rounded-lg font-medium text-sm hover:bg-[#F0F0F0] transition-colors"
            aria-label={cancelText}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
              isDestructive
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-[#232529] text-white hover:bg-[#1a1a1a]'
            }`}
            aria-label={confirmText}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}