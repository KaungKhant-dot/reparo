import React from 'react';
import { MapPin, Leaf, Wrench } from 'lucide-react';
import { CITY_IMPACTS } from '@/lib/demo-data';

export default function CityImpactSection() {
  const maxCo2e = Math.max(...CITY_IMPACTS?.map(c => c?.co2eAvoidedKg));

  return (
    <section className="px-5 md:px-10 lg:px-16 py-10 md:py-16">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start">
          {/* Left: Header */}
          <div className="lg:w-72 mb-8 lg:mb-0">
            <p className="text-sm font-600 text-primary uppercase tracking-widest mb-2">လူထု သက်ရောက်မှု · Community Impact</p>
            <h2 className="text-xl md:text-2xl font-700 text-foreground mb-1">
              မြန်မာနိုင်ငံတစ်ဝှမ်း ပြင်ဆင်မှုများ
            </h2>
            <p className="text-base text-primary/70 font-500 mb-3">Repair happening across Myanmar</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              REPARO လူထုမှ ပြင်ဆင်ထားသော ပစ္စည်းတိုင်းသည် မြန်မာနိုင်ငံ၏ ကာဗွန်ခြေရာကို လျော့ကျစေသည်။
            </p>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Leaf size={16} className="text-primary" />
                <p className="text-sm font-600 text-primary">စုစုပေါင်း · Community Total</p>
              </div>
              <p className="text-2xl font-800 text-primary">25,740 kg</p>
              <p className="text-xs text-muted-foreground font-500">မြို့အားလုံးတွင် CO₂e လျော့ကျမှု</p>
            </div>
          </div>

          {/* Right: City bars */}
          <div className="flex-1 space-y-4">
            {CITY_IMPACTS?.map((city) => {
              const pct = Math.round((city?.co2eAvoidedKg / maxCo2e) * 100);
              return (
                <div key={`city-${city?.city}`} className="card-surface p-4 md:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      <span className="font-600 text-foreground text-sm">{city?.city}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-500">
                      <span className="flex items-center gap-1">
                        <Wrench size={11} className="text-primary" />
                        {city?.repairsCompleted?.toLocaleString()} ကြိမ်
                      </span>
                      <span className="flex items-center gap-1 text-success font-600">
                        <Leaf size={11} />
                        {city?.co2eAvoidedKg?.toLocaleString()} kg CO₂e
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}