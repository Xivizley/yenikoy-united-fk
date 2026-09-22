'use client';

import React from 'react';
import { ToastMessage } from '@/types';
import { CircleCheck, AlertTriangle, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  const colors = {
    success: 'bg-emerald-950/95 border-emerald-500/50 text-emerald-100',
    info: 'bg-club-navy-deep/95 border-club-gold/50 text-slate-100',
    error: 'bg-rose-950/95 border-rose-500/50 text-rose-100',
  };

  return (
    <div
      id="toastContainer"
      className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none max-w-sm w-full px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-2xl border ${
            colors[toast.type] || colors.info
          } shadow-2xl backdrop-blur-xl flex items-start gap-3 transform transition-all duration-300 pointer-events-auto animate-in slide-in-from-bottom-2 fade-in`}
        >
          {toast.type === 'success' ? (
            <CircleCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
          ) : (
            <span className="text-lg mt-0.5 flex-shrink-0">⚽</span>
          )}
          <div className="flex-1">
            <h5 className="font-display font-extrabold text-sm text-white">{toast.title}</h5>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white text-xs cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
