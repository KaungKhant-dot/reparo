import React from 'react';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppLayout({ children, className = '' }: AppLayoutProps) {
  return (
    <div className="min-h-screen rice-paper-texture">
      <TopNav />
      <main className={`md:pt-16 pb-20 md:pb-0 ${className}`}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}