'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Recycle, Coins, Users, ArrowRight, Home, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { PERSONAL_IMPACT } from '@/lib/demo-data';

function AnimatedCounter({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function ImpactCompleteClient() {
  const { t } = useLanguage();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      id: 'stat-item',
      icon: Recycle,
      value: 1,
      suffix: '',
      label: t('ပစ္စည်း ကယ်တင်ပြီ', 'Item rescued'),
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
    },
    {
      id: 'stat-co2',
      icon: Sparkles,
      value: 184,
      suffix: ' kg',
      label: t('CO₂e လျော့ကျ', 'CO₂e avoided'),
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
      note: t('ကာဗွန် ထုတ်လွှတ်မှု လျော့ကျ', 'Carbon emission reduced'),
    },
    {
      id: 'stat-save',
      icon: Coins,
      value: 345000,
      suffix: ' K',
      label: t('ငွေ သက်သာ', 'MMK saved'),
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/20',
    },
    {
      id: 'stat-job',
      icon: Users,
      value: 1,
      suffix: '',
      label: t('ပြည်တွင်း အလုပ် ထောက်ပံ့', 'Local job supported'),
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      border: 'border-secondary/20',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 md:py-16">
      <div className="max-w-lg w-full mx-auto">

        {/* Hero celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          {/* Trophy icon */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-green"
          >
            <Award size={44} className="text-white" />
          </motion.div>

          {/* Sparkle dots */}
          <div className="relative">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-warning rounded-full"
                style={{
                  top: `${Math.sin(i * 60 * Math.PI / 180) * 60 - 10}px`,
                  left: `calc(50% + ${Math.cos(i * 60 * Math.PI / 180) * 60}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ delay: 0.3 + i * 0.1, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              />
            ))}
          </div>

          <h1 className="text-2xl md:text-3xl font-800 text-foreground mb-2 mt-4">
            {t('သင့်ပစ္စည်း ဒုတိယ အသက် ရပြီ!', 'Your item got a second life!')}
          </h1>
          <p className="text-muted-foreground font-500 text-base">
            {t('ပြင်ဆင်ပြီ · ပြန်သုံးပြီ · ထပ်ခါ ထပ်ခါ', 'Repair. Reuse. Repeat.')}
          </p>
        </motion.div>

        {/* Impact stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={showStats ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className={`card-surface p-4 text-center border ${stat.border}`}
              >
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <StatIcon size={20} className={stat.color} />
                </div>
                <p className={`text-2xl font-800 ${stat.color}`}>
                  {showStats ? (
                    <>
                      {stat.id === 'stat-co2' ? '18.4' : <AnimatedCounter target={stat.value} />}
                      {stat.suffix}
                    </>
                  ) : '—'}
                </p>
                <p className="text-xs font-700 text-foreground mt-1">{stat.label}</p>
                {stat.note && <p className="text-xs text-muted-foreground mt-0.5">{stat.note}</p>}
              </motion.div>
            );
          })}
        </div>

        {/* Environmental equivalency */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showStats ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="card-surface p-4 mb-4 bg-primary/5 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🌱</div>
            <div>
              <p className="text-sm font-700 text-foreground mb-1">
                {t('သဘာဝ ပတ်ဝန်းကျင် ညီမျှမှု', 'Environmental Equivalency')}
              </p>
              <p className="text-sm text-muted-foreground font-500">
                {t(
                  'သင့် CO₂e လျော့ကျမှုသည် မန်ကျည်းပင် ၃ ပင် ကြီးထွားသည့် အကျိုးကျေးဇူးနှင့် ညီမျှသည်ဟု ခန့်မှန်းသည်။',
                  'Your estimated impact is equivalent to growing approximately 3 mangrove seedlings.'
                )}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1 italic">
                {t('(ခန့်မှန်းချက် — တိကျသော သိပ္ပံဆိုင်ရာ တိုင်းတာမှု မဟုတ်ပါ)', '(Illustrative equivalency, not a precise scientific measurement)')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Personal cumulative impact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showStats ? { opacity: 1 } : {}}
          transition={{ delay: 1.0 }}
          className="card-surface p-4 mb-6"
        >
          <h3 className="text-sm font-700 text-foreground mb-3 flex items-center gap-2">
            <Award size={14} className="text-warning" />
            {t('သင့် စုစုပေါင်း သက်ရောက်မှု', 'Your Total Impact')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: t('ပစ္စည်း ကယ်တင်ပြီ', 'Items rescued'), value: PERSONAL_IMPACT.itemsKeptInUse, color: 'text-primary' },
              { label: t('CO₂e လျော့ကျ', 'CO₂e avoided'), value: `${PERSONAL_IMPACT.co2eAvoidedKg} kg`, color: 'text-success' },
              { label: t('ငွေ သက်သာ', 'Money saved'), value: `K ${PERSONAL_IMPACT.moneySavedMMK.toLocaleString()}`, color: 'text-warning' },
              { label: t('ပြင်ဆင်မှု ပြီးဆုံး', 'Repairs done'), value: PERSONAL_IMPACT.repairsCompleted, color: 'text-secondary' },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-xl p-3 text-center">
                <p className={`text-lg font-800 ${item.color}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground font-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Business model signal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showStats ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="card-surface p-4 mb-6"
        >
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider mb-3">
            {t('ငွေပေးချေမှု အကျဉ်းချုပ်', 'Payment Summary')}
          </p>
          {[
            { label: t('သင် ပေးချေသည်', 'You paid'), amount: 75000, color: 'text-foreground' },
            { label: t('ပြင်ဆင်သူ ရရှိသည်', 'Partner received'), amount: 67500, color: 'text-success' },
            { label: t('REPARO ဝန်ဆောင်ခ', 'REPARO fee'), amount: 7500, color: 'text-muted-foreground' },
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground font-500">{row.label}</span>
              <span className={`text-sm font-700 ${row.color}`}>K {row.amount.toLocaleString()}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showStats ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="space-y-3"
        >
          <button className="btn-primary w-full justify-center text-base py-4">
            <Share2 size={18} />
            {t('သင့် သက်ရောက်မှု မျှဝေရန်', 'Share Your Impact')}
          </button>
          <Link href="/ai-diagnostic-screen" className="btn-outline w-full justify-center text-base py-4">
            <Recycle size={18} />
            {t('အခြားပစ္စည်း ပြင်ဆင်ရန်', 'Repair Another Item')}
            <ArrowRight size={16} />
          </Link>
          <Link href="/" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-500 py-2">
            <Home size={14} />
            {t('ပင်မစာမျက်နှာ', 'Back to Home')}
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
