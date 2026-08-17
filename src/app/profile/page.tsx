'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { User, Phone, Mail, MapPin, Shield, ChevronRight, Award, LogOut, Info } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { PERSONAL_IMPACT } from '@/lib/demo-data';

export default function ProfilePage() {
  const { t } = useLanguage();

  const mockUser = {
    name: t('ကျော်မင်းထင်', 'Kyaw Min Htin'),
    phone: '+95 9 797 123 456',
    email: 'kyawminhtin@reparo.com',
    location: t('မန္တလေးမြို့', 'Mandalay, Myanmar'),
    joinedDate: t('ဧပြီ ၂၀၂၄', 'April 2024'),
  };

  return (
    <AppLayout>
      <div className="space-y-4 px-1 py-2">
        {/* Page title */}
        <div>
          <h1 className="text-xl font-800 text-foreground">{t('ပရိုဖိုင်', 'Profile')}</h1>
          <p className="text-sm text-muted-foreground font-500">{t('အကောင့်အချက်အလက်များ', 'Account Information')}</p>
        </div>

        {/* Profile Card */}
        <div className="card-surface p-5 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-lg mb-3 relative border-4 border-white">
            <User size={36} className="text-primary-foreground" />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-success border-2 border-white flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-lg font-800 text-foreground">{mockUser.name}</h2>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-700 mt-1 uppercase tracking-wider">
            {t('ဧည့်သည်အကောင့်', 'Guest Member')}
          </span>

          <div className="w-full border-t border-border mt-5 pt-4 space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm">
              <Phone size={15} className="text-primary flex-shrink-0" />
              <span className="text-muted-foreground font-500">{mockUser.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={15} className="text-primary flex-shrink-0" />
              <span className="text-muted-foreground font-500">{mockUser.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={15} className="text-primary flex-shrink-0" />
              <span className="text-muted-foreground font-500">{mockUser.location}</span>
            </div>
          </div>
        </div>

        {/* Demo Warning Banner */}
        <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-4">
          <Info size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground font-500 leading-relaxed">
            <span className="font-700">{t('အကောင့်လုံခြုံရေး -', 'Frictionless Access:')}</span>{' '}
            {t(
              'REPARO သည် hackathon ဝန်ဆောင်မှုအတွက် အကောင့်ဝင်ရန် မလိုဘဲ တိုက်ရိုက်စမ်းသပ်နိုင်သည်။ သင့်ဒေတာများကို local storage တွင် သိမ်းဆည်းထားသည်။',
              'No signup needed to test. To preserve the frictionless judge experience, all diagnostic logs are saved locally on your device.'
            )}
          </p>
        </div>

        {/* Personal Stats Summary */}
        <div className="card-surface p-4">
          <h3 className="text-xs font-700 text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award size={14} />
            {t('ကိုယ်ပိုင် သက်ရောက်မှု', 'Your Circular Stats')}
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-muted rounded-xl p-2.5">
              <p className="text-lg font-800 text-foreground">{PERSONAL_IMPACT.itemsKeptInUse}</p>
              <p className="text-[10px] text-muted-foreground font-600 mt-0.5">{t('ကယ်တင်ပစ္စည်း', 'Items Saved')}</p>
            </div>
            <div className="bg-success/10 rounded-xl p-2.5">
              <p className="text-lg font-800 text-success">{PERSONAL_IMPACT.co2eAvoidedKg}kg</p>
              <p className="text-[10px] text-muted-foreground font-600 mt-0.5">{t('CO₂e လျော့ကျ', 'CO₂e Saved')}</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-2.5">
              <p className="text-lg font-800 text-primary">386k</p>
              <p className="text-[10px] text-muted-foreground font-600 mt-0.5">{t('သက်သာငွေ (MMK)', 'Saved MMK')}</p>
            </div>
          </div>
        </div>

        {/* Social Connect Links */}
        <div className="card-surface p-2 space-y-0.5">
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 font-bold text-sm">G</div>
              <span className="text-sm font-600 text-foreground">{t('Google ဖြင့် ချိတ်ဆက်ရန်', 'Connect Google Account')}</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">f</div>
              <span className="text-sm font-600 text-foreground">{t('Facebook ဖြင့် ချိတ်ဆက်ရန်', 'Connect Facebook Account')}</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>

        {/* Logout (Frictionless reset) */}
        <button 
          onClick={() => alert(t('Demo resetting local storage...', 'Resetting demo data...'))}
          className="w-full btn-outline justify-center text-error border-error/20 hover:bg-error/5 py-3.5 text-sm"
        >
          <LogOut size={15} />
          <span>{t('ဒေတာများ ပြန်လည်သတ်မှတ်ရန်', 'Reset Demo Data')}</span>
        </button>
      </div>
    </AppLayout>
  );
}
