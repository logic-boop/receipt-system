// src/app/dashboard/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { logoutAction } from '@/app/actions/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Read local browser preferences on load
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      
      {/* Universal Dashboard Navigation Header Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md w-full px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-base tracking-tight text-blue-600 dark:text-blue-400">📄 RelayerReceipts</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggler Button */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:opacity-80 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          {/* Logout Action Form Button Wrapper */}
          <form action={logoutAction}>
            <button type="submit" className="text-xs font-medium px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Dynamic Render Surface Canvas Space */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}