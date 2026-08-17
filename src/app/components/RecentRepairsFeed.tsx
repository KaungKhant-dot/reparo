'use client';

import React from 'react';
import { Wrench, Heart, RefreshCw, Clock, TrendingUp } from 'lucide-react';
import { RECENT_REPAIRS } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

const REC_ICON: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  REPAIR:  Wrench,
  DONATE:  Heart,
  RECYCLE: RefreshCw,
  RESELL:  TrendingUp,
};

const REC_COLORS: Record<string, { container: string; badge: string }> = {
  REPAIR:  { container: 'bg-primary/10 text-primary',     badge: 'bg-primary/10 text-primary' },
  DONATE:  { container: 'bg-secondary/10 text-secondary', badge: 'bg-secondary/10 text-secondary' },
  RECYCLE: { container: 'bg-muted text-muted-foreground', badge: 'bg-muted text-muted-foreground' },
  RESELL:  { container: 'bg-accent/20 text-primary',      badge: 'bg-accent/20 text-primary' },
};

const REC_MYANMAR: Record<string, string> = {
  REPAIR:  'ပြင်ဆင်ရန်',
  DONATE:  'လှူဒါန်းရန်',
  RECYCLE: 'ပြန်လည်အသုံးပြုရန်',
  RESELL:  'ရောင်းချရန်',
};

const REC_ENGLISH: Record<string, string> = {
  REPAIR:  'Repair',
  DONATE:  'Donate',
  RECYCLE: 'Recycle',
  RESELL:  'Resell',
};

const CITY_MAP: Record<string, string> = {
  Yangon:    'ရန်ကုန်',
  Mandalay:  'မန္တလေး',
  Naypyidaw: 'နေပြည်တော်',
  Mawlamyine:'မော်လမြိုင်',
};

export default function RecentRepairsFeed() {
  const { t } = useLanguage();

  return (
    <section className="px-4 md:px-8 lg:px-12 py-8 md:py-10 bg-card/60">
      <div className="max-w-screen-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-[11px] font-700 text-success uppercase tracking-widest">
                {t('တိုက်ရိုက် လုပ်ဆောင်မှု', 'Live Activity')}
              </p>
            </div>
            <h2 className="text-lg md:text-xl font-700 text-foreground">
              {t('မကြာသေးမီ ပြင်ဆင်မှုများ', 'Recent Repairs Across Myanmar')}
            </h2>
          </div>
        </div>

        {/* Feed grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {RECENT_REPAIRS.map((repair) => {
            const RepairIcon = REC_ICON[repair.recommendation] || Wrench;
            const colors = REC_COLORS[repair.recommendation] || REC_COLORS.REPAIR;
            const label = t(
              REC_MYANMAR[repair.recommendation] || repair.recommendation,
              REC_ENGLISH[repair.recommendation] || repair.recommendation
            );
            const cityMy = CITY_MAP[repair.city] || repair.city;
            const timeAgo = repair.timeAgo
              .replace('min ago', 'မိနစ်ခန့်က')
              .replace('hr ago', 'နာရီခန့်က');

            return (
              <div
                key={repair.id}
                className="card-surface p-3.5 flex items-center gap-3 hover:shadow-elevated transition-shadow duration-200"
              >
                {/* Icon badge */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.container}`}
                >
                  <RepairIcon size={18} strokeWidth={2} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-600 text-foreground text-sm truncate">{repair.itemName}</p>
                    <span
                      className={`text-[10px] font-700 px-2 py-0.5 rounded-full flex-shrink-0 ${colors.badge}`}
                    >
                      {label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="font-500 truncate max-w-[60px]">{repair.userName}</span>
                    <span className="text-border">·</span>
                    <span className="burmese-caption">{t(cityMy, repair.city)}</span>
                    <span className="text-border">·</span>
                    <span className="flex items-center gap-0.5 flex-shrink-0">
                      <Clock size={9} strokeWidth={2} />
                      <span className="burmese-caption">{t(timeAgo, repair.timeAgo)}</span>
                    </span>
                  </div>
                </div>

                {/* Savings — right-aligned tabular */}
                {repair.savedMMK > 0 && (
                  <div className="text-right flex-shrink-0">
                    <p className="text-[9px] text-muted-foreground font-500">
                      {t('သက်သာငွေ', 'Saved')}
                    </p>
                    <p className="text-sm font-700 text-success tabular-nums">
                      K {repair.savedMMK.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}