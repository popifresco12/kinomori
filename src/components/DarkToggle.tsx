'use client';
import useDarkMode from '@/hooks/useDarkMode';
import { Sun, Moon } from 'lucide-react';
export default function DarkToggle() {
  const [dark, setDark] = useDarkMode();
  return (
    <button onClick={() => setDark(!dark)}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode">
      {dark ? <Sun size={18} className="text-amber-400"/> : <Moon size={18} className="text-gray-600"/>}
    </button>
  );
}
