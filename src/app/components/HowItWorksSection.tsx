'use client';

import React from 'react';
import { Camera, Cpu, Bike, Leaf, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HOW_IT_WORKS_STEPS } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Camera,
  Cpu,
  Bike,
  Leaf,
};

const MYANMAR_STEPS: Record<string, { title: string; description: string }> = {
  'step-scan':   { title: 'ဓာတ်ပုံ ရိုက်ပါ',   description: 'သင့်ပစ္စည်း ပျက်စီးနေသောနေရာကို ဓာတ်ပုံ ရိုက်ပါ သို့မဟုတ် တင်ပါ' },
  'step-decide': { title: 'AI စစ်ဆေးသည်',       description: 'AI က ပျက်စီးမှုကို စစ်ဆေးပြီး ပြင်ဆင်ကုန်ကျစရိတ် တွက်ချက်ပေးသည်' },
  'step-repair': { title: 'ကောက်ယူ & ပြင်ဆင်', description: 'Rider က သင့်ပစ္စည်းကို ကောက်ယူပြီး ယုံကြည်ရသော ဆိုင်သို့ ပို့ဆောင်သည်' },
  'step-impact': { title: 'ပြန်လည် ရရှိသည်',   description: 'ပြင်ဆင်ပြီးသော ပစ္စည်းကို သင့်ထံ ပြန်ပို့ပေးသည်' },
};

export default function HowItWorksSection() {
  const { t } = useLanguage();

  return (
    <section className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="max-w-screen-2xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-7">
          <p className="text-[11px] font-700 text-primary uppercase tracking-widest mb-1.5">
            {t('ဘယ်လို အလုပ်လုပ်သလဲ', 'How It Works')}
          </p>
          <h2 className="text-hero-md text-foreground mb-1.5">
            {t('လွယ်ကူသော အဆင့် ၄ ဆင့်', '4 Simple Steps')}
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto burmese-body">
            {t(
              'ပျက်စီးနေသော ပစ္စည်းမှ ပြင်ဆင်ပြီး ပြန်ရသည်အထိ — platform တစ်ခုတည်းဖြင့်',
              'From cracked and broken to fully repaired — managed end-to-end.'
            )}
          </p>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const StepIcon = ICON_MAP[step.icon] || Camera;
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;
            const mmStep = MYANMAR_STEPS[step.id];
            return (
              <div key={step.id} className="relative">
                <div className="card-surface p-5 h-full flex flex-col">
                  {/* Icon + step number row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-card flex-shrink-0">
                      <StepIcon size={20} strokeWidth={2} className="text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-800 text-muted/60 tabular-nums">{step.step}</span>
                  </div>

                  <h3 className="text-sm font-700 text-foreground mb-1 burmese-heading">
                    {t(mmStep?.title || step.title, step.title)}
                  </h3>
                  <p className="text-xs text-muted-foreground burmese-body leading-relaxed flex-1">
                    {t(mmStep?.description || step.description, step.description)}
                  </p>
                </div>

                {/* Connector arrow (desktop only) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 bg-card border border-border rounded-full items-center justify-center shadow-card">
                    <ArrowRight size={11} strokeWidth={2} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <Link href="/ai-diagnostic-screen" className="btn-primary text-sm px-7 py-3 inline-flex">
            <Camera size={16} strokeWidth={2} />
            <span>{t('ယခုပင် စမ်းကြည့်ပါ', 'Try It Now — Free')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}