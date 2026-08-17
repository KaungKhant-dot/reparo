'use client';

import React from 'react';
import { MapPin, Leaf, Wrench } from 'lucide-react';
import { CITY_IMPACTS } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

const CITY_MAP: Record<string, string> = {
  Yangon:    'ရန်ကုန်',
  Mandalay:  'မန္တလေး',
  Naypyidaw: 'နေပြည်တော်',
  Mawlamyine:'မော်လမြိုင်',
};

export default function CityImpactSection() {
  const { t } = useLanguage();
  const maxCo2e = Math.max(...CITY_IMPACTS?.map(c => c?.co2eAvoidedKg));

  return (
    <section className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-start">

          {/* Left: Header */}
          <div className="lg:w-64 mb-6 lg:mb-0">
            <p className="text-[11px] font-700 text-primary uppercase tracking-widest mb-1.5">
              {t('လူထု သက်ရောက်မှု', 'Community Impact')}
            </p>
            <h2 className="text-xl md:text-2xl font-700 text-foreground mb-2">
              {t('မြန်မာနိုင်ငံတစ်ဝှမ်း', 'Repairing Across Myanmar')}
            </h2>
            <p className="text-muted-foreground text-sm burmese-body leading-relaxed">
              {t(
                'REPARO လူထုမှ ပြင်ဆင်ထားသော ပစ္စည်းတိုင်းသည် မြန်မာနိုင်ငံ၏ ကာဗွန်ခြေရာကို လျော့ကျစေသည်။',
                'Every item repaired by the REPARO community directly prevents electronic waste and reduces carbon footprint.'
              )}
            </p>

            {/* Community total callout */}
            <div className="mt-5 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Leaf size={14} strokeWidth={2} className="text-primary" />
                </div>
                <p className="text-sm font-600 text-primary">
                  {t('စုစုပေါင်း လျော့ကျမှု', 'Community Total')}
                </p>
              </div>
              <p className="text-2xl font-800 text-primary tabular-nums">25,740 kg</p>
              <p className="text-[10px] text-muted-foreground font-500 mt-0.5">
                {t('မြို့အားလုံးတွင် CO₂e လျော့ကျမှု', 'Total CO₂e avoided across cities')}
              </p>
            </div>
          </div>

          {/* Right: City progress bars */}
          <div className="flex-1 space-y-3">
            {CITY_IMPACTS?.map((city) => {
              const pct = Math.round((city?.co2eAvoidedKg / maxCo2e) * 100);
              const cityMy = CITY_MAP[city.city] || city.city;
              const translatedCity = t(cityMy, city.city);

              return (
                <div key={`city-${city?.city}`} className="card-surface p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    {/* City name */}
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} strokeWidth={2} className="text-primary flex-shrink-0" />
                      <span className="font-700 text-foreground text-sm burmese-caption">
                        {translatedCity}
                      </span>
                    </div>

                    {/* Metrics — tabular right-aligned */}
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-500">
                      <span className="flex items-center gap-1">
                        <Wrench size={10} strokeWidth={2} className="text-primary" />
                        <span className="tabular-nums">
                          {t(
                            `${city?.repairsCompleted?.toLocaleString()} ကြိမ်`,
                            `${city?.repairsCompleted?.toLocaleString()} repairs`
                          )}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-success font-700">
                        <Leaf size={10} strokeWidth={2} />
                        <span className="tabular-nums">
                          {city?.co2eAvoidedKg?.toLocaleString()} kg CO₂e
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
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