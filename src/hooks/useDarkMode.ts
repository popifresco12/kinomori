'use client';
import { useEffect, useState } from 'react';
export default function useDarkMode() {
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' && localStorage.theme === 'dark'
  );
  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add('dark'); localStorage.theme = 'dark'; }
    else { root.classList.remove('dark'); localStorage.theme = 'light'; }
  }, [dark]);
  return [dark, setDark] as const;
}
