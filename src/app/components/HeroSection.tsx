'use client';

import React from 'react';
import Link from 'next/link';
import { ScanLine, ArrowRight, Sparkles, Wrench, Camera, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-5 pt-8 pb-10 md:px-10 md:pt-16 md:pb-20 lg:px-16">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 blob-green pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-50 blob-green pointer-events-none" />
      <div className="relative max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left: Copy */}
          <div className="flex-1 lg:max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-600 mb-6">
              <Sparkles size={14} />
              <span>{t('မြန်မာ့ Circular Economy Platform', "Myanmar's Circular Economy Platform")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-hero-xl text-foreground mb-2">
              {t('အစားမထိုးပါနဲ့။', "Don't replace it.")}{' '}
              <span className="text-primary">{t('ပြင်ဆင်လိုက်ပါ။', 'Repair it.')}</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
              {t(
                'AI နည်းပညာဖြင့် သင့်ပစ္စည်းကို ပြင်ဆင်ရမလား၊ ရောင်းရမလား၊ လှူဒါန်းရမလား ဆုံးဖြတ်ပေးသည်။ MMK ဖြင့် ကုန်ကျစရိတ် တွက်ချက်ပေးသည်။',
                'AI-powered diagnosis tells you whether to repair, resell, donate, or recycle — with full cost breakdown in MMK and live pickup service.'
              )}
            </p>

            {/* Beginner-friendly step guide */}
            <div className="bg-card border border-border rounded-2xl p-4 mb-6 shadow-card">
              <p className="text-xs font-700 text-primary uppercase tracking-wider mb-3">
                {t('မည်သို့ အသုံးပြုမည်နည်း', 'How it works — 3 easy steps')}
              </p>
              <div className="space-y-2.5">
                {[
                  { step: '1', icon: Camera, label: t('ဓာတ်ပုံ ရိုက်ပါ', 'Take a photo of your item'), color: 'bg-primary/10 text-primary' },
                  { step: '2', icon: Sparkles, label: t('AI မှ ဆုံးဖြတ်ချက် ရပါမည်', 'Get AI recommendation instantly'), color: 'bg-secondary/10 text-secondary' },
                  { step: '3', icon: Wrench, label: t('ပြင်ဆင်မှု ဆက်လက် ဆောင်ရွက်ပါ', 'Book repair & track live'), color: 'bg-success/10 text-success' },
                ]?.map((s) => {
                  const StepIcon = s?.icon;
                  return (
                    <div key={s?.step} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${s?.color} flex items-center justify-center flex-shrink-0 font-800 text-sm`}>
                        {s?.step}
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <StepIcon size={14} className="text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-600 text-foreground">{s?.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust signals for beginners */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                t('အကောင့်မလိုပါ', 'No account needed'),
                t('အခမဲ့ စစ်ဆေးနိုင်', 'Free to scan'),
                t('MMK ဖြင့် ကုန်ကျ တွက်ချက်', 'Prices in MMK'),
              ]?.map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 bg-success/10 text-success text-xs font-600 px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={12} />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/ai-diagnostic-screen" className="btn-primary text-base px-7 py-3.5 justify-center">
                <ScanLine size={18} />
                <span>{t('ပစ္စည်း စကင်ဖတ်ရန်', 'Scan an Item')}</span>
              </Link>
              <Link href="/ai-result-screen" className="btn-outline text-base px-7 py-3.5 justify-center">
                <span>{t('Demo ကြည့်ရန်', 'See Demo')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: Visual card stack */}
          <div className="hidden lg:flex flex-1 justify-center items-center mt-12 lg:mt-0">
            <div className="relative w-80">
              {/* Back card */}
              <div className="absolute -top-4 -right-4 w-full card-surface p-5 opacity-60 rotate-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Wrench size={18} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-600 text-foreground">Canvas Backpack</p>
                    <p className="text-xs text-muted-foreground">{t('ဇစ်ပျက် + ပိတ်စပျက်', 'Broken zipper + fabric wear')}</p>
                  </div>
                </div>
                <div className="bg-success/10 rounded-xl px-3 py-2 text-center">
                  <p className="text-success font-700 text-sm">{t('ပြင်ဆင်ပါ — K 18,000', 'Repair — K 18,000')}</p>
                </div>
              </div>

              {/* Front card */}
              <div className="relative card-elevated p-6 -rotate-1 bg-card z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-600 text-muted-foreground uppercase tracking-wider">{t('AI စစ်ဆေးချက်', 'AI Diagnosis')}</span>
                  </div>
                  <span className="text-xs font-700 text-primary bg-primary/10 px-2 py-1 rounded-full">{t('94% တိကျမှု', '94% confidence')}</span>
                </div>

                <div className="mb-4">
                  <p className="font-700 text-foreground text-base">Smartphone</p>
                  <p className="text-sm text-muted-foreground">{t('မျက်နှာပြင် ကွဲ + ဘောင်ပျက်', 'Cracked display + frame dent')}</p>
                </div>

                <div className="bg-success/10 border border-success/30 rounded-xl p-3 mb-4 text-center">
                  <p className="text-success font-800 text-lg">✓ {t('ပြင်ဆင်ရန် အကြံပြုသည်', 'Repair Recommended')}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-muted rounded-xl p-2.5">
                    <p className="text-xs text-muted-foreground font-500">{t('ပြင်ဆင်ကုန်ကျ', 'Repair cost')}</p>
                    <p className="font-700 text-foreground text-base">K 75,000</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-2.5">
                    <p className="text-xs text-muted-foreground font-500">{t('သက်သာငွေ', 'You save')}</p>
                    <p className="font-700 text-success text-base">K 345,000</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 bg-primary/5 rounded-xl px-3 py-2">
                  <Sparkles size={13} className="text-primary" />
                  <p className="text-xs text-primary font-600">18.4 kg CO₂e {t('လျော့ကျ', 'avoided')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}