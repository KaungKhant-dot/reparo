import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Leaf, Heart } from 'lucide-react';

export default function HomeFooter() {
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
            <span className="text-muted-foreground text-sm">အစားမထိုးပါနဲ့။ ပြင်ဆင်လိုက်ပါ။</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">ပင်မစာမျက်နှာ</Link>
            <Link href="/ai-diagnostic-screen" className="hover:text-primary transition-colors">ပစ္စည်း စကင်ဖတ်ရန်</Link>
            <Link href="/ai-result-screen" className="hover:text-primary transition-colors">Demo ကြည့်ရန်</Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Leaf size={12} className="text-primary" />
            <span>Circular Economy Hackathon MVP</span>
            <span>·</span>
            <Heart size={11} className="text-error" />
            <span>မြန်မာနိုင်ငံ 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}