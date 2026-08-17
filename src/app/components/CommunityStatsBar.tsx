'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Leaf, Coins, Store } from 'lucide-react';
import { COMMUNITY_TOTALS } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

export default function CommunityStatsBar() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const repairs = useCountUp(COMMUNITY_TOTALS.totalRepairs, 1600, visible);
  const co2e = useCountUp(Math.round(COMMUNITY_TOTALS.totalCo2eAvoidedKg), 1800, visible);
  const shops = useCountUp(COMMUNITY_TOTALS.activeRepairShops, 1200, visible);

  const stats = [
    {
      id: 'stat-repairs',
      icon: Users,
      value: repairs.toLocaleString(),
      label: t('ကယ်တင်ထားသောပစ္စည်း', 'Items Rescued'),
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      id: 'stat-co2e',
      icon: Leaf,
      value: `${co2e.toLocaleString()} kg`,
      label: t('CO₂e လျော့ကျမှု', 'CO₂e Avoided'),
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      id: 'stat-savings',
      icon: Coins,
      value: t('K ၉၈၆ မီ', 'K 986M'),
      label: t('ကြေးငွေ သက်သာမှု', 'Community Savings'),
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      id: 'stat-shops',
      icon: Store,
      value: shops.toString(),
      label: t('ပြင်ဆင်ရေး မိတ်ဖက်', 'Repair Partners'),
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  return (
    <section ref={ref} className="px-4 md:px-8 lg:px-12 py-4 md:py-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="card-surface p-4 md:p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              const isLast = i === stats.length - 1;
              return (
                <React.Fragment key={stat.id}>
                  <div className="flex items-center gap-2.5">
                    {/* Icon badge */}
                    <div
                      className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <StatIcon size={17} strokeWidth={2} className={stat.color} />
                    </div>
                    <div className="min-w-0">
                      <p className={`counter-animate text-lg md:text-xl font-800 ${stat.color} tabular-nums leading-tight`}>
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-600 text-muted-foreground burmese-caption leading-snug mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                  {/* Vertical divider between columns on md+ */}
                  {!isLast && (
                    <div className="hidden md:block absolute" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}