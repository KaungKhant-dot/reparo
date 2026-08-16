import React from 'react';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppLayout({ children, className = '' }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center md:py-8 md:px-4">
      {/* Centered mobile-first device container */}
      <div className="relative w-full max-w-[480px] h-screen md:h-[840px] bg-background md:rounded-[40px] md:shadow-2xl md:border-[12px] md:border-slate-800 overflow-hidden flex flex-col rice-paper-texture">
        
        {/* Status bar mockup for desktop view */}
        <div className="hidden md:block absolute top-0 left-0 right-0 h-6 bg-slate-800/10 z-50">
          <div className="mx-auto w-32 h-4 bg-slate-800 rounded-b-xl" />
        </div>

        {/* Scrollable Main Content Area */}
        <main className={`flex-1 overflow-y-auto pt-6 pb-24 ${className}`}>
          {children}
        </main>

        {/* Sticky Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}