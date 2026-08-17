'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Leaf, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function HomeFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border px-5 md:px-10 lg:px-16 py-8 md:py-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-700 text-primary text-lg">REPARO</span>
            </div>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">
              {t('အစားမထိုးပါနဲ့။ ပြင်ဆင်လိုက်ပါ။', "Don't replace it. Repair it.")}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              {t('ပင်မစာမျက်နှာ', 'Home')}
            </Link>
            <Link href="/ai-diagnostic-screen" className="hover:text-primary transition-colors">
              {t('ပစ္စည်း စကင်ဖတ်ရန်', 'Scan Item')}
            </Link>
            <Link href="/ai-result-screen" className="hover:text-primary transition-colors">
              {t('Demo ကြည့်ရန်', 'See Demo')}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Leaf size={12} className="text-primary" />
            <span>Circular Economy Hackathon MVP</span>
            <span>·</span>
            <Heart size={11} className="text-error" />
            <span>{t('မြန်မာနိုင်ငံ 2026', 'Myanmar 2026')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}