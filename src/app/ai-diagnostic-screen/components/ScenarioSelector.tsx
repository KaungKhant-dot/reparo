'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Upload, ChevronRight, Smartphone, Backpack, Zap, Info } from 'lucide-react';
import { ITEM_SCENARIOS, ItemScenario } from '@/lib/demo-data';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/lib/language-context';

interface ScenarioSelectorProps {
  onStart: (scenario: ItemScenario) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Electronics: Smartphone,
  Textile: Backpack,
  Appliance: Zap,
};

export default function ScenarioSelector({ onStart }: ScenarioSelectorProps) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(ITEM_SCENARIOS[0].id);

  const selectedScenario = ITEM_SCENARIOS.find(s => s.id === selectedId) || ITEM_SCENARIOS[0];

  return (
    <div className="min-h-screen px-5 md:px-10 lg:px-16 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-card">
            <Camera size={26} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-3xl font-800 text-foreground mb-1">{t('AI စစ်ဆေးခြင်း', 'AI Diagnostic')}</h1>
          <p className="text-base font-600 text-primary/70 mb-2">{t('AI Circular Diagnostic', 'AI Circular Diagnostic')}</p>
          <p className="text-muted-foreground">
            {t('ဓာတ်ပုံ ရိုက်ပါ သို့မဟုတ် demo scenario ရွေးချယ်ပါ — REPARO က သင့်ပစ္စည်းကို စစ်ဆေးပေးမည်။', 'Take a photo or choose a demo scenario — REPARO will scan your item.')}
          </p>
        </div>

        {/* Demo info banner */}
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-8">
          <Info size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground font-500">
            <span className="font-700">{t('ဒီမိုမုဒ်:', 'Demo Mode:')}</span> {t('အောက်မှ scenario တစ်ခု ရွေးချယ်ပြီး AI စစ်ဆေးမှု ကြည့်ရှုနိုင်သည်။ ကင်မရာ မလိုပါ။', 'Select a scenario below to watch the AI scan in action. No camera required.')}
          </p>
        </div>

        {/* Upload area */}
        <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-8 text-center mb-6 transition-colors duration-200 cursor-pointer group">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
            <Upload size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="font-600 text-foreground mb-1">{t('ပစ္စည်း ဓာတ်ပုံ တင်ပါ', 'Upload a photo of your item')}</p>
          <p className="text-sm text-muted-foreground mb-3">{t('JPG, PNG အများဆုံး 10 MB — သို့မဟုတ် demo scenarios သုံးပါ', 'JPG, PNG up to 10 MB — or use demo scenarios')}</p>
          <span className="inline-flex items-center gap-2 bg-muted text-muted-foreground text-sm font-500 px-4 py-2 rounded-full">
            <Camera size={14} />
            {t('ဓာတ်ပုံ ရိုက် / တင်ရန်', 'Take / Upload Photo')}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-600 text-muted-foreground uppercase tracking-wider">{t('သို့မဟုတ် demo scenario ရွေးပါ', 'Or choose a demo scenario')}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Scenario cards */}
        <div className="space-y-3 mb-8">
          {ITEM_SCENARIOS.map((scenario) => {
            const Icon = CATEGORY_ICONS[scenario.category] || Camera;
            const isSelected = selectedId === scenario.id;

            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedId(scenario.id)}
                className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 flex items-center gap-4 ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-green'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-primary/2'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted relative">
                  <Image
                    src={scenario.imageUrl}
                    alt={scenario.imageAlt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className={isSelected ? 'text-primary' : 'text-muted-foreground'} />
                    <p className="font-700 text-foreground text-sm">{scenario.name}</p>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-500">
                      {scenario.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {scenario.damageLabels.map(d => d.label).join(' · ')}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {scenario.damageLabels.map((d) => (
                      <span
                        key={`chip-${scenario.id}-${d.label}`}
                        className="text-xs bg-error/10 text-error px-2 py-0.5 rounded-full font-500"
                      >
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selected indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  isSelected ? 'border-primary bg-primary' : 'border-border'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={() => onStart(selectedScenario)}
          className="btn-primary w-full justify-center text-base py-4 text-lg"
        >
          <Camera size={20} />
          <span>{t('AI စကင် စတင်ရန်', 'Start AI Scan')}</span>
          <ChevronRight size={18} />
        </button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {t('၂-၃ စက္ကန့်သာ ကြာသည် · ဒေတာ မသိမ်းဆည်း · ရလဒ်များသည် ခန့်မှန်းချက်သာ ဖြစ်သည်', 'Takes 2-3s · No data saved · Results are estimations only')}
        </p>

        <div className="text-center mt-4">
          <Link href="/ai-result-screen" className="text-sm text-primary font-600 hover:underline">
            {t('ရလဒ်သို့ ကျော်သွားရန် →', 'Skip to result →')}
          </Link>
        </div>
      </div>
    </div>
  );
}