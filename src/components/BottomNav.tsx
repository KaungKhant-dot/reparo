'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScanLine, MapPin, Award, User } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const NAV_ITEMS = [
    { id: 'nav-home', label: language === 'my' ? 'ပင်မ' : 'Home', icon: Home, href: '/' },
    { id: 'nav-scan', label: language === 'my' ? 'စကင်' : 'Scan', icon: ScanLine, href: '/ai-diagnostic-screen', isAction: true },
    { id: 'nav-track', label: language === 'my' ? 'ခြေရာခံ' : 'Track', icon: MapPin, href: '/repair-tracker' },
    { id: 'nav-impact', label: language === 'my' ? 'သက်ရောက်မှု' : 'Impact', icon: Award, href: '/impact-complete' },
    { id: 'nav-profile', label: language === 'my' ? 'ပရိုဖိုင်' : 'Profile', icon: User, href: '/profile' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-card border-t border-border bottom-nav-safe">
      <div className="flex items-center justify-around px-2 py-1">
        {NAV_ITEMS?.map((item) => {
          const isActive = pathname === item?.href || (item?.href !== '/' && pathname?.startsWith(item?.href));
          const NavIcon = item?.icon;

          if (item?.isAction) {
            return (
              <Link key={item?.id} href={item?.href} className="flex flex-col items-center -mt-5">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-card">
                  <NavIcon size={24} className="text-primary-foreground" />
                </div>
                <span className="text-xs font-600 text-primary mt-1">{item?.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item?.id}
              href={item?.href}
              className={`nav-tab ${isActive ? 'active' : ''}`}
            >
              <NavIcon
                size={22}
                className={isActive ? 'text-primary' : 'text-muted-foreground'}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={`text-xs font-600 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {item?.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}