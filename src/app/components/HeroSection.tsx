'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Wrench,
  Camera,
  Bike,
  Banknote,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

// Step data with vector icons instead of emoji
const HERO_STEPS = [
  {
    id: 'hero-step-1',
    icon: Camera,
    titleMy: 'အဆင့် ၁: စကင်',
    titleEn: 'Step 1: Scan',
    descMy: 'ပျက်စီးနေသောနေရာ ဓာတ်ပုံရိုက်ပါ',
    descEn: 'Photo of damaged item',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    id: 'hero-step-2',
    icon: Banknote,
    titleMy: 'အဆင့် ၂: တွက်ချက်',
    titleEn: 'Step 2: Estimate',
    descMy: 'ကုန်ကျစရိတ် AI တွက်မည်',
    descEn: 'Instant AI cost breakdown',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    id: 'hero-step-3',
    icon: Bike,
    titleMy: 'အဆင့် ၃: ပို့ဆောင်',
    titleEn: 'Step 3: Doorstep',
    descMy: 'အိမ်တိုင်ရာရောက် ပြင်ဆင်မှု',
    descEn: 'Delivery rider pickup',
    color: 'text-success',
    bg: 'bg-success/10',
  },
];

const TRUST_BADGES = [
  { my: 'အကောင့်ဝင်ရန် မလိုပါ', en: 'No Login Required' },
  { my: 'အခမဲ့ စစ်ဆေးနိုင်ပါသည်', en: '100% Free Scan' },
  { my: 'MMK ဖြင့် ပြသမည်', en: 'Prices in MMK' },
];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-4 pt-3 pb-4 md:px-8 md:pt-6 md:pb-6">
      {/* Subtle ambient background blob */}
      <div className="absolute top-0 right-0 w-56 h-56 blob-green pointer-events-none opacity-35" />

      <div className="relative max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">

          {/* ── Left / Main Column ── */}
          <div className="flex-1">

            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-[11px] font-700 mb-3">
              <Sparkles size={11} strokeWidth={2} />
              <span>{t('မြန်မာ့ Circular Economy Platform', "Myanmar's Circular Economy")}</span>
            </div>

            {/* H1 – Burmese-safe leading */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-800 text-foreground mb-2 burmese-heading">
              {t(
                'ဖုန်းနှင့် ပစ္စည်းများကို စကင်ဖတ်ပြီး အလွယ်တကူ ပြင်ဆင်ပါ',
                'Scan & Repair Your Devices Effortlessly'
              )}
            </h1>

            <p className="text-sm text-muted-foreground font-500 mb-4 burmese-body">
              {t(
                'အကောင့်ဖွင့်ရန်မလိုဘဲ အခမဲ့ စကင်ဖတ်ပါ။ AI ဖြင့် စက္ကန့်ပိုင်းအတွင်း ပြင်ဆင်ကုန်ကျစရိတ်ကို တွက်ချက်ပေးပါသည်။',
                'Scan for free with no login required. Instant AI cost and savings analysis in MMK.'
              )}
            </p>

            {/* 3-Step Mini Card — compact, vector icons */}
            <div className="bg-card border border-border rounded-2xl p-3.5 mb-4 shadow-sm">
              <p className="text-[10px] font-700 text-primary uppercase tracking-wider mb-2.5">
                {t('အဆင့် ၃ ဆင့်ဖြင့် လွယ်ကူစွာ', 'How It Works — 3 Steps')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {HERO_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center gap-1.5 bg-muted/40 rounded-xl p-2 text-center"
                    >
                      {/* Vector icon badge */}
                      <div
                        className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon size={16} strokeWidth={2} className={step.color} />
                      </div>
                      <div>
                        <p className="text-[10px] font-700 text-foreground leading-snug">
                          {t(step.titleMy, step.titleEn)}
                        </p>
                        <p className="text-[9px] text-muted-foreground burmese-caption leading-snug mt-0.5">
                          {t(step.descMy, step.descEn)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {TRUST_BADGES.map((badge) => {
                const label = t(badge.my, badge.en);
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 bg-success/10 text-success text-[10px] font-700 px-2.5 py-1 rounded-full"
                  >
                    <CheckCircle2 size={10} strokeWidth={2.5} />
                    {label}
                  </span>
                );
              })}
            </div>

            {/* ── PRIMARY CTA — above fold, full-width on mobile ── */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/ai-diagnostic-screen"
                className="btn-primary text-sm px-5 py-3 justify-center shadow-md active:scale-95 transition-all w-full sm:w-auto"
              >
                <Camera size={16} strokeWidth={2} />
                <span>{t('စတင်စစ်ဆေးမည်', 'Start Scanning — Free')}</span>
              </Link>
              <Link
                href="/ai-result-screen"
                className="btn-outline text-sm px-5 py-3 justify-center w-full sm:w-auto"
              >
                <span>{t('ဒီမိုကြည့်ရန်', 'See Demo')}</span>
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          {/* ── Right side: Mock Diagnosis Card (desktop only) ── */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="relative w-72">

              {/* Back card */}
              <div className="absolute -top-3 -right-3 w-full card-surface p-4 opacity-50 rotate-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <Wrench size={14} strokeWidth={2} className="text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-700 text-foreground">Canvas Backpack</p>
                    <p className="text-[10px] text-muted-foreground burmese-caption">
                      {t('ဇစ်ပျက်နေသည်', 'Broken zipper')}
                    </p>
                  </div>
                </div>
                <div className="bg-success/5 rounded-lg px-2 py-1.5 text-center text-xs font-700 text-success">
                  {t('ပြင်ဆင်ရန် — K 18,000', 'Repair — K 18,000')}
                </div>
              </div>

              {/* Front card */}
              <div className="relative card-elevated p-5 -rotate-1 bg-card z-10 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] font-700 text-muted-foreground uppercase tracking-wider">
                      {t('AI စစ်ဆေးချက်', 'AI Diagnosis')}
                    </span>
                  </div>
                  <span className="text-[10px] font-800 text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {t('၉၄% တိကျမှု', '94% Match')}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="font-800 text-foreground text-sm">Smartphone</p>
                  <p className="text-xs text-muted-foreground burmese-caption">
                    {t('မျက်နှာပြင် ကွဲအက်သွားသည်', 'Cracked screen')}
                  </p>
                </div>

                {/* Savings highlight */}
                <div className="bg-success/10 border border-success/30 rounded-xl p-3 mb-3 text-center">
                  <p className="text-[10px] text-success font-700 uppercase tracking-wider mb-0.5">
                    {t('ငွေ သက်သာမှု', 'You Save')}
                  </p>
                  <p className="text-lg font-900 text-success tabular-nums">
                    {t('K ၃၄၅,၀၀၀', 'K 345,000')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-[9px] text-muted-foreground font-600 mb-0.5">
                      {t('ပြင်ဆင်ကုန်ကျ', 'Repair Cost')}
                    </p>
                    <p className="font-700 text-foreground text-xs tabular-nums">K 75,000</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-2">
                    <p className="text-[9px] text-muted-foreground font-600 mb-0.5">
                      {t('CO₂e လျော့ကျမှု', 'CO₂e Saved')}
                    </p>
                    <p className="font-700 text-primary text-xs tabular-nums">18.4 kg</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}