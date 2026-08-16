import React from 'react';
import { Camera, Cpu, Bike, Leaf, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HOW_IT_WORKS_STEPS } from '@/lib/demo-data';



const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Camera,
  Cpu,
  Bike,
  Leaf,
};

const MYANMAR_STEPS: Record<string, { title: string; description: string }> = {
  'step-1': { title: 'ဓာတ်ပုံ ရိုက်ပါ', description: 'သင့်ပစ္စည်း ပျက်စီးနေသောနေရာကို ဓာတ်ပုံ ရိုက်ပါ သို့မဟုတ် တင်ပါ' },
  'step-2': { title: 'AI စစ်ဆေးသည်', description: 'AI က ပျက်စီးမှုကို စစ်ဆေးပြီး ပြင်ဆင်ကုန်ကျစရိတ် တွက်ချက်ပေးသည်' },
  'step-3': { title: 'ကောက်ယူ & ပြင်ဆင်', description: 'Rider က သင့်ပစ္စည်းကို ကောက်ယူပြီး ယုံကြည်ရသော ဆိုင်သို့ ပို့ဆောင်သည်' },
  'step-4': { title: 'ပြန်လည် ရရှိသည်', description: 'ပြင်ဆင်ပြီးသော ပစ္စည်းကို သင့်ထံ ပြန်ပို့ပေးသည်' },
};

export default function HowItWorksSection() {
  return (
    <section className="px-5 md:px-10 lg:px-16 py-10 md:py-16">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-600 text-primary uppercase tracking-widest mb-2">ဘယ်လို အလုပ်လုပ်သလဲ · How It Works</p>
          <h2 className="text-hero-md text-foreground mb-1">လွယ်ကူသော အဆင့် ၄ ဆင့်</h2>
          <p className="text-lg font-600 text-primary/70 mb-3">Repair in 4 simple steps</p>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ပျက်စီးနေသော ပစ္စည်းမှ ပြင်ဆင်ပြီး ပြန်ရသည်အထိ — platform တစ်ခုတည်းဖြင့် အပြည့်အဝ ဆောင်ရွက်ပေးသည်။
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const StepIcon = ICON_MAP[step.icon] || Camera;
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;
            const mmStep = MYANMAR_STEPS[step.id];
            return (
              <div key={step.id} className="relative">
                <div className="card-surface p-6 h-full flex flex-col">
                  {/* Step number + icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-card">
                      <StepIcon size={22} className="text-primary-foreground" />
                    </div>
                    <span className="text-3xl font-800 text-muted/70">{step.step}</span>
                  </div>

                  <h3 className="text-base font-700 text-foreground mb-0.5">{mmStep?.title || step.title}</h3>
                  <p className="text-xs font-500 text-primary/70 mb-2">{step.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{mmStep?.description || step.description}</p>
                </div>

                {/* Connector arrow */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 bg-card border border-border rounded-full items-center justify-center shadow-card">
                    <ArrowRight size={12} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/ai-diagnostic-screen" className="btn-primary text-base px-8 py-3.5 inline-flex">
            <Camera size={18} />
            <span>ယခုပင် စမ်းကြည့်ပါ · Try It Now — Free</span>
          </Link>
        </div>
      </div>
    </section>
  );
}