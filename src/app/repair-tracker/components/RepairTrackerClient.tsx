'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Circle, Clock, MapPin, Star, Shield,
  Bike, Wrench, Package, ChevronRight, Phone, ArrowRight,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { DEMO_RIDER, buildStagesAtStatus, TrackingStatus } from '@/lib/tracking-mock';
import { REPAIR_PARTNERS } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

const STATUS_ORDER: TrackingStatus[] = [
  'pickup-confirmed', 'rider-assigned', 'item-collected',
  'diagnosing', 'repairing', 'quality-check', 'returning', 'completed'
];

const STAGE_LABELS_MY: Record<string, { label: string; sub: string }> = {
  'pickup-confirmed': { label: 'ကောက်ယူမည် အတည်ပြုပြီ', sub: 'REPARO မှ အမိန့်လက်ခံပြီ' },
  'rider-assigned': { label: 'ဆိုင်ကယ်သမား ခန့်ထားပြီ', sub: 'Kyaw Zin Min လာနေသည်' },
  'item-collected': { label: 'ပစ္စည်း ကောက်ယူပြီ', sub: 'ပြင်ဆင်ဆိုင်သို့ သွားနေသည်' },
  'diagnosing': { label: 'စစ်ဆေးနေသည်', sub: 'ပြင်ဆင်ရမည့် အတိုင်းအတာ စစ်ဆေးနေသည်' },
  'repairing': { label: 'ပြင်ဆင်နေသည်', sub: 'မျက်နှာပြင် အစားထိုးနေသည်' },
  'quality-check': { label: 'အရည်အသွေး စစ်ဆေးနေသည်', sub: 'လုပ်ဆောင်ချက်များ စမ်းသပ်နေသည်' },
  'returning': { label: 'ပြန်ပို့နေသည်', sub: 'သင့်ထံ ဆိုင်ကယ်သမား လာနေသည်' },
  'completed': { label: 'ပြင်ဆင်မှု ပြီးဆုံးပြီ', sub: 'ပစ္စည်း အောင်မြင်စွာ ပေးပို့ပြီ' },
};

export default function RepairTrackerClient() {
  const { t } = useLanguage();
  const [currentStatusIdx, setCurrentStatusIdx] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [riderPos, setRiderPos] = useState(20);
  const [trackingId, setTrackingId] = useState('RPR-2024-042');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentStatus = STATUS_ORDER[currentStatusIdx];
  const stages = buildStagesAtStatus(currentStatus);
  const partner = REPAIR_PARTNERS[0];

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (currentStatusIdx >= STATUS_ORDER.length - 1) {
      setIsAutoPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStatusIdx(prev => prev + 1);
      setRiderPos(prev => Math.min(prev + 12, 80));
    }, 2000);
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStatusIdx]);

  const isCompleted = currentStatus === 'completed';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getOverallState = () => {
    if (currentStatus === 'pickup-confirmed') {
      return {
        label: t('ဆိုင်းငံ့ထားဆဲ', 'Pending'),
        color: 'bg-warning/10 text-warning border-warning/30',
      };
    }
    if (currentStatus === 'completed') {
      return {
        label: t('ပြီးဆုံးပြီ', 'Completed'),
        color: 'bg-success/10 text-success border-success/30',
      };
    }
    return {
      label: t('လုပ်ဆောင်နေဆဲ', 'In Progress'),
      color: 'bg-secondary/10 text-secondary border-secondary/30',
    };
  };

  const overallState = getOverallState();

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-16 py-6 md:py-10">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-800 text-foreground">
              {t('သင့်ပြင်ဆင်မှု', 'Your Repair')}
            </h1>
            <p className="text-sm text-muted-foreground font-500">
              {t('တိုက်ရိုက် ခြေရာခံနေသည်', 'Live tracking')} · #{trackingId}
            </p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 border ${overallState.color}`}>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
            {overallState.label}
          </div>
        </div>

        {/* Tracking ID Search Bar */}
        <div className="flex gap-2 items-center bg-card border border-border rounded-2xl p-3 shadow-sm">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder={t('ခြေရာခံနံပါတ် ရိုက်ထည့်ပါ', 'Enter Tracking ID')}
            className="flex-1 bg-muted border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 text-foreground font-600"
          />
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center p-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl transition-all disabled:opacity-50"
            title={t('လန်းဆန်းစေရန်', 'Refresh Status')}
          >
            <RefreshCw size={15} className={`transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Simulated Map */}
        <div className="card-surface p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-primary" />
            <span className="text-xs font-700 text-primary uppercase tracking-wider">
              {t('ဆိုင်ကယ်သမား တည်နေရာ', 'Rider Location')}
            </span>
            {currentStatusIdx >= 1 && currentStatusIdx < 7 && (
              <span className="ml-auto text-xs font-600 text-muted-foreground">
                ETA: {currentStatusIdx <= 2 ? '12 min' : currentStatusIdx <= 4 ? '~2 hrs' : '15 min'}
              </span>
            )}
          </div>

          {/* Map visual */}
          <div className="relative bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl h-40 overflow-hidden border border-border">
            {/* Road */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300/60 -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/80 -translate-y-1/2 border-dashed" />

            {/* Customer pin */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-800">{t('သင်', 'You')}</span>
              </div>
              <span className="text-xs font-600 text-primary bg-white px-1.5 py-0.5 rounded shadow-sm">
                {t('သင်', 'You')}
              </span>
            </div>

            {/* Repair shop pin */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-md">
                <Wrench size={14} className="text-white" />
              </div>
              <span className="text-xs font-600 text-secondary bg-white px-1.5 py-0.5 rounded shadow-sm">
                {t('ဆိုင်', 'Shop')}
              </span>
            </div>

            {/* Animated rider */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              animate={{ left: `${riderPos}%` }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <div className="w-9 h-9 bg-warning rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Bike size={16} className="text-white" />
              </div>
              <span className="text-xs font-700 text-warning bg-white px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                {DEMO_RIDER.name.split(' ')[0]}
              </span>
            </motion.div>

            {/* Map grid overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(#2A8C6E 1px, transparent 1px), linear-gradient(90deg, #2A8C6E 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Rider info */}
          <div className="mt-3 flex items-center gap-3 bg-muted/50 rounded-xl p-3">
            <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-800 text-sm">
                {DEMO_RIDER.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-700 text-foreground text-sm">{DEMO_RIDER.name}</p>
              <div className="flex items-center gap-2">
                <Star size={11} className="text-warning fill-warning" />
                <span className="text-xs text-muted-foreground font-500">{DEMO_RIDER.rating} · {DEMO_RIDER.vehicleType}</span>
              </div>
            </div>
            <a href={`tel:${DEMO_RIDER.phone}`} className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone size={15} className="text-primary" />
            </a>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="card-surface p-5">
          <h3 className="font-700 text-foreground text-sm mb-4 flex items-center gap-2">
            <Package size={14} className="text-primary" />
            {t('ပြင်ဆင်မှု အဆင့်များ', 'Repair Progress')}
          </h3>
          <div className="space-y-0">
            {stages.map((stage, idx) => {
              const myLabel = STAGE_LABELS_MY[stage.id];
              return (
                <div key={stage.id} className="flex gap-3">
                  {/* Icon column */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: stage.isActive ? [1, 1.15, 1] : 1,
                      }}
                      transition={{ duration: 0.4, repeat: stage.isActive ? Infinity : 0, repeatDelay: 1.5 }}
                    >
                      {stage.isCompleted ? (
                        <CheckCircle2 size={22} className="text-success fill-success/20" />
                      ) : stage.isActive ? (
                        <div className="w-5 h-5 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <Circle size={22} className="text-muted-foreground/40" />
                      )}
                    </motion.div>
                    {idx < stages.length - 1 && (
                      <div className={`w-0.5 h-8 mt-1 ${stage.isCompleted ? 'bg-success/40' : 'bg-border'}`} />
                    )}
                  </div>

                  {/* Label column */}
                  <div className={`pb-6 flex-1 ${idx === stages.length - 1 ? 'pb-0' : ''}`}>
                    <p className={`text-sm font-700 ${stage.isActive ? 'text-primary' : stage.isCompleted ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                      {t(myLabel?.label || stage.label, stage.label)}
                    </p>
                    <p className={`text-xs font-500 mt-0.5 ${stage.isActive ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                      {t(myLabel?.sub || stage.subLabel, stage.subLabel)}
                    </p>
                    {stage.isActive && stage.eta && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock size={11} className="text-primary" />
                        <span className="text-xs font-700 text-primary">ETA: {stage.eta}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verified Partner */}
        <div className="card-surface p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={13} className="text-primary" />
            <span className="text-xs font-700 text-primary uppercase tracking-wider">
              {t('REPARO အတည်ပြုထားသော မိတ်ဖက်', 'Verified Partner')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-800">{partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
            </div>
            <div className="flex-1">
              <p className="font-700 text-foreground text-sm">{partner.name}</p>
              <p className="text-xs text-muted-foreground">{partner.specialty}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-600">
                  ★ {partner.rating}
                </span>
                <span className="text-xs text-muted-foreground font-500">
                  {partner.repairsCompleted} {t('ကြိမ် ပြင်ဆင်ပြီး', 'repairs done')}
                </span>
              </div>
            </div>
          </div>

          {/* Repair update */}
          {(currentStatusIdx >= 4) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3 border-t border-border bg-primary/5 rounded-xl p-3"
            >
              <p className="text-xs font-700 text-primary mb-1">
                {t('ပြင်ဆင်မှု အပ်ဒိတ်', 'Repair Update')}
              </p>
              <p className="text-sm font-600 text-foreground">
                {currentStatusIdx === 4 ? t('မျက်နှာပြင် အစားထိုးနေသည်', 'Display replacement in progress') : 
                 currentStatusIdx === 5 ? t('အရည်အသွေး စစ်ဆေးနေသည်', 'Quality testing in progress') :
                 t('ပြင်ဆင်မှု အောင်မြင်စွာ ပြီးဆုံးပါပြီ', 'Repair successfully completed')}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                {currentStatusIdx <= 5 ? t('ခန့်မှန်းချိန် ၂ နာရီ', 'Estimated 2 hours') : t('စစ်ဆေးချက် ပြီးဆုံး', 'Checked & Verified')}
              </p>

              {/* Visual Before / During / After Proof */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-card rounded-lg p-2 border border-border text-center shadow-sm">
                  <span className="text-[10px] font-700 text-muted-foreground uppercase">{t('မပြင်ခင်', 'Before')}</span>
                  <div className="h-10 bg-error/10 border border-error/20 rounded flex items-center justify-center mt-1 text-xs text-error font-bold">
                    {t('ကွဲအက်', 'Cracked')}
                  </div>
                </div>
                <div className="bg-card rounded-lg p-2 border border-border text-center shadow-sm">
                  <span className="text-[10px] font-700 text-warning uppercase">{t('ပြင်ဆင်ဆဲ', 'During')}</span>
                  <div className={`h-10 rounded flex items-center justify-center mt-1 text-xs font-bold ${currentStatusIdx === 4 ? 'bg-warning/15 border border-warning/30 text-warning animate-pulse' : 'bg-success/10 border border-success/20 text-success'}`}>
                    {currentStatusIdx > 4 ? t('✓ လုပ်ပြီး', '✓ Fixed') : t('ပြင်ဆင်ဆဲ', 'fixing')}
                  </div>
                </div>
                <div className="bg-card rounded-lg p-2 border border-border text-center shadow-sm">
                  <span className="text-[10px] font-700 text-success uppercase">{t('ပြင်ပြီး', 'After')}</span>
                  <div className={`h-10 rounded flex items-center justify-center mt-1 text-xs font-bold ${currentStatusIdx >= 5 ? 'bg-success/15 border border-success/30 text-success' : 'bg-muted border border-border text-muted-foreground'}`}>
                    {currentStatusIdx >= 5 ? t('✓ အသစ်', '✓ Pristine') : t('မစရသေး', 'Ready')}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Demo controls */}
        <div className="card-surface p-4 border border-dashed border-primary/30">
          <p className="text-xs font-700 text-primary uppercase tracking-wider mb-3 text-center">
            {t('ဒီမို မုဒ်', 'Demo Mode')} — {t('အဆင့်ပြောင်းရန်', 'Advance Status')}
          </p>
          <div className="flex gap-2">
            {!isCompleted && (
              <button
                onClick={() => {
                  if (currentStatusIdx < STATUS_ORDER.length - 1) {
                    setCurrentStatusIdx(prev => prev + 1);
                    setRiderPos(prev => Math.min(prev + 12, 80));
                  }
                }}
                className="btn-primary flex-1 justify-center text-sm py-3"
              >
                {t('နောက်အဆင့်', 'Next Stage')}
                <ChevronRight size={16} />
              </button>
            )}
            <button
              onClick={() => setIsAutoPlaying(p => !p)}
              className={`btn-outline flex-1 justify-center text-sm py-3 ${isAutoPlaying ? 'border-warning text-warning' : ''}`}
            >
              {isAutoPlaying ? (t('ရပ်ရန်', 'Pause')) : (t('အလိုအလျောက် ပြေးရန်', 'Auto-play'))}
            </button>
          </div>
          {isCompleted && (
            <Link
              href="/impact-complete"
              className="btn-primary w-full justify-center text-sm py-3 mt-2"
            >
              {t('သက်ရောက်မှု ကြည့်ရန်', 'See Your Impact')}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
