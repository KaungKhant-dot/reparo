'use client';

import React from 'react';
import BottomNav from './BottomNav';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/lib/language-context';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppLayout({ children, className = '' }: AppLayoutProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center md:py-8 md:px-4">
      {/* Centered mobile-first device container */}
      <div className="relative w-full max-w-[480px] h-screen md:h-[840px] bg-background md:rounded-[40px] md:shadow-2xl md:border-[12px] md:border-slate-800 overflow-hidden flex flex-col rice-paper-texture">
        
        {/* Status bar mockup for desktop view */}
        <div className="hidden md:block absolute top-0 left-0 right-0 h-6 bg-slate-800/10 z-50">
          <div className="mx-auto w-32 h-4 bg-slate-800 rounded-b-xl" />
        </div>

        {/* Sticky Top App Bar */}
        <header className="sticky top-0 left-0 right-0 z-40 bg-card border-b border-border px-4 py-3 md:mt-6 flex items-center justify-between shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo size={24} />
            <span className="font-bold text-base text-primary tracking-tight">REPARO</span>
          </Link>

          {/* Language Toggle switch (EN / MM) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all"
            aria-label="Toggle language"
          >
            <span className={`text-xs font-800 transition-colors ${language === 'en' ? 'text-primary font-900' : 'text-muted-foreground/60'}`}>EN</span>
            <span className="text-[10px] text-primary/30">|</span>
            <span className={`text-xs font-800 transition-colors ${language === 'my' ? 'text-primary font-900' : 'text-muted-foreground/60'}`}>မြ</span>
          </button>
        </header>

        {/* Scrollable Main Content Area — pb-28 ensures bottom nav never overlaps */}
        <main className={`flex-1 overflow-y-auto pb-28 ${className}`}>
          {children}
        </main>

        {/* Sticky Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}