'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Wrench, Camera, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-4 pt-4 pb-8 md:px-8 md:pt-10 md:pb-12">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 blob-green pointer-events-none opacity-40" />
      
      <div className="relative max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          
          {/* Main Hero Card */}
          <div className="flex-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-700 mb-4">
              <Sparkles size={12} />
              <span>{t('မြန်မာ့ Circular Economy Platform', "Myanmar's Circular Economy Platform")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-800 text-foreground mb-3 leading-tight">
              {t(
                'ဖုန်းနှင့် ပစ္စည်းများကို စကင်ဖတ်ပြီး အလွယ်တကူ ပြင်ဆင်ပါ',
                'Scan & Repair Your Devices Effortlessly'
              )}
            </h1>

            <p className="text-sm text-muted-foreground font-500 mb-5 leading-relaxed">
              {t(
                'အကောင့်ဖွင့်ရန်မလိုဘဲ အခမဲ့ စကင်ဖတ်ပါ။ AI ဖြင့် စက္ကန့်ပိုင်းအတွင်း ပြင်ဆင်ကုန်ကျစရိတ်ကို တွက်ချက်ပေးပါသည်။',
                'Scan for free with no login required. Instant AI cost and savings analysis in MMK.'
              )}
            </p>

            {/* 3-Step Visual Onboarding */}
            <div className="bg-card border border-border rounded-2xl p-4 mb-6 shadow-sm">
              <p className="text-xs font-700 text-primary uppercase tracking-wider mb-3">
                {t('အသုံးပြုရန် လွယ်ကူသော အဆင့် ၃ ဆင့်', 'How it works in 3 easy steps')}
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 bg-muted/40 p-2.5 rounded-xl">
                  <div className="text-xl">📸</div>
                  <div>
                    <h4 className="text-xs font-700 text-foreground">{t('အဆင့် ၁: စကင်ဖတ်', 'Step 1: Scan')}</h4>
                    <p className="text-[10px] text-muted-foreground">{t('ပျက်စီးနေသောနေရာ ဓာတ်ပုံရိုက်ပါ', 'Photo of damaged item')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-muted/40 p-2.5 rounded-xl">
                  <div className="text-xl">💰</div>
                  <div>
                    <h4 className="text-xs font-700 text-foreground">{t('အဆင့် ၂: တွက်ချက်', 'Step 2: Estimate')}</h4>
                    <p className="text-[10px] text-muted-foreground">{t('ကုန်ကျစရိတ် AI တွက်မည်', 'Instant AI cost breakdown')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-muted/40 p-2.5 rounded-xl">
                  <div className="text-xl">🛵</div>
                  <div>
                    <h4 className="text-xs font-700 text-foreground">{t('အဆင့် ၃: ပို့ဆောင်', 'Step 3: Doorstep')}</h4>
                    <p className="text-[10px] text-muted-foreground">{t('အိမ်တိုင်ရာရောက် ပြင်ဆင်မှု', 'Delivery rider pickup')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {[
                t('အကောင့်ဝင်ရန် မလိုပါ', 'No Login Required'),
                t('အခမဲ့ စစ်ဆေးနိုင်ပါသည်', '100% Free Scan'),
                t('မြန်မာကျပ်ငွေ (MMK) ဖြင့် ပြသမည်', 'Prices in MMK'),
              ]?.map((label) => (
                <span key={label} className="inline-flex items-center gap-1 bg-success/10 text-success text-[10px] font-700 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={10} />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link 
                href="/ai-diagnostic-screen" 
                className="btn-primary text-sm px-6 py-3 justify-center shadow-md active:scale-95 transition-all w-full sm:w-auto"
              >
                <span>{t('📸 စတင်စစ်ဆေးမည်', '📸 Start Scanning')}</span>
              </Link>
              <Link 
                href="/ai-result-screen" 
                className="btn-outline text-sm px-6 py-3 justify-center w-full sm:w-auto"
              >
                <span>{t('ဒီမိုကြည့်ရန်', 'See Demo')}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right side: Mock Interactive Diagnosis Card */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="relative w-72">
              
              {/* Back card */}
              <div className="absolute -top-3 -right-3 w-full card-surface p-4 opacity-50 rotate-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <Wrench size={14} className="text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-700 text-foreground">Canvas Backpack</p>
                    <p className="text-[10px] text-muted-foreground">{t('ဇစ်ပျက်နေသည်', 'Broken zipper')}</p>
                  </div>
                </div>
                <div className="bg-success/5 rounded-lg px-2 py-1.5 text-center text-xs font-700 text-success">
                  {t('ပြင်ဆင်ရန် — K 18,000', 'Repair — K 18,000')}
                </div>
              </div>

              {/* Front card - PRIORITIZE SAVINGS */}
              <div className="relative card-elevated p-5 -rotate-1 bg-card z-10 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] font-700 text-muted-foreground uppercase tracking-wider">{t('AI စစ်ဆေးချက်', 'AI Diagnosis')}</span>
                  </div>
                  <span className="text-[10px] font-800 text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t('၉၄% တိကျမှု', '94% Match')}</span>
                </div>

                <div className="mb-3">
                  <p className="font-800 text-foreground text-sm">Smartphone</p>
                  <p className="text-xs text-muted-foreground">{t('မျက်နှာပြင် ကွဲအက်သွားသည်', 'Cracked screen')}</p>
                </div>

                {/* HIGHLIGHT USER SAVINGS FIRST */}
                <div className="bg-success/10 border border-success/30 rounded-xl p-3 mb-3 text-center">
                  <p className="text-[10px] text-success font-750 uppercase tracking-wider mb-0.5">
                    {t('ငွေ သက်သာမှု', 'You Save')}
                  </p>
                  <p className="text-lg font-900 text-success">
                    {t('၃၄၅,၀၀၀ ကျပ်', 'K 345,000')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-[9px] text-muted-foreground font-600">{t('ပြင်ဆင်ကုန်ကျ', 'Repair Cost')}</p>
                    <p className="font-700 text-foreground text-xs">K 75,000</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-2 flex flex-col justify-center items-center">
                    <p className="text-[9px] text-muted-foreground font-600">{t('CO₂e လျော့ကျမှု', 'CO₂e Saved')}</p>
                    <p className="font-700 text-primary text-xs">18.4 kg</p>
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