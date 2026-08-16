'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { ScanLine, MapPin, Award, Home } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function TopNav() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();

  const NAV_ITEMS = [
    { id: 'nav-home', label: language === 'my' ? 'ပင်မ' : 'Home', icon: Home, href: '/' },
    { id: 'nav-scan', label: language === 'my' ? 'ပစ္စည်း စကင်' : 'Scan Item', icon: ScanLine, href: '/ai-diagnostic-screen' },
    { id: 'nav-track', label: language === 'my' ? 'ပြင်ဆင်မှု ခြေရာခံ' : 'Track Repair', icon: MapPin, href: '/repair-tracker' },
    { id: 'nav-impact', label: language === 'my' ? 'ကျွန်ုပ်၏ သက်ရောက်မှု' : 'My Impact', icon: Award, href: '/impact-complete' },
  ];

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 items-center px-6 lg:px-10">
      <div className="flex items-center gap-2 mr-8">
        <AppLogo size={32} />
        <span className="font-bold text-lg text-primary tracking-tight">REPARO</span>
      </div>
      <nav className="flex items-center gap-1">
        {NAV_ITEMS?.map((item) => {
          const isActive = pathname === item?.href || (item?.href !== '/' && pathname?.startsWith(item?.href));
          const NavIcon = item?.icon;
          return (
            <Link
              key={item?.id}
              href={item?.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-500 transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <NavIcon size={16} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{item?.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all"
          aria-label="Toggle language"
        >
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-800 text-primary leading-none">
              {language === 'my' ? 'EN' : 'မြ'}
            </span>
          </div>
          <span className="text-sm font-600 text-primary">
            {language === 'my' ? 'English' : 'မြန်မာ'}
          </span>
        </button>

        <Link
          href="/ai-diagnostic-screen"
          className="btn-primary text-sm px-5 py-2.5"
        >
          <ScanLine size={16} />
          <span>{language === 'my' ? 'ပစ္စည်း စကင်ဖတ်ရန်' : 'Scan an Item'}</span>
        </Link>
      </div>
    </header>
  );
}