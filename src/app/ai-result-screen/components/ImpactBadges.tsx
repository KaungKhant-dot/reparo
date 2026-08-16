import React from 'react';
import { Sparkles, Recycle, Zap } from 'lucide-react';
import { DiagnosticResult } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

interface ImpactBadgesProps {
  result: DiagnosticResult;
}

export default function ImpactBadges({ result }: ImpactBadgesProps) {
  const { t } = useLanguage();

  const badges = [
    {
      id: 'badge-co2e',
      icon: Sparkles,
      value: `${result.co2eAvoidedKg} kg`,
      label: t('CO₂e လျော့ကျ', 'CO₂e avoided'),
      color: 'text-success',
      bg: 'bg-primary/5',
      border: 'border-primary/20',
    },
    {
      id: 'badge-item',
      icon: Recycle,
      value: t('၁ ခု', '1 item'),
      label: t('ဆက်လက် အသုံးပြုနိုင်', 'Kept in use'),
      color: 'text-primary',
      bg: 'bg-primary/5',
      border: 'border-primary/20',
    },
    {
      id: 'badge-job',
      icon: Zap,
      value: t('၁ ဦး', '1 job'),
      label: t('အလုပ် ထောက်ပံ့', 'Job supported'),
      color: 'text-secondary',
      bg: 'bg-secondary/5',
      border: 'border-secondary/20',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.id}
            className={`rounded-2xl p-3.5 text-center border ${badge.bg} ${badge.border}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 bg-white/80 border ${badge.border}`}>
              <Icon size={15} className={badge.color} />
            </div>
            <p className={`text-base font-800 ${badge.color} counter-animate`}>{badge.value}</p>
            <p className="text-xs font-600 text-foreground">{badge.label}</p>
          </div>
        );
      })}
    </div>
  );
}