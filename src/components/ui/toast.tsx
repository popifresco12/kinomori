'use client';
import type { ReactNode } from 'react';
export function Toast({ children }: { children: ReactNode }) {
  return <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4 text-sm">{children}</div>;
}
