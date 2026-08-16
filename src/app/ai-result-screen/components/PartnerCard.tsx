import React from 'react';
import { Star, Shield, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { REPAIR_PARTNERS } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

export default function PartnerCard() {
  const { t } = useLanguage();
  const partner = REPAIR_PARTNERS?.[0];

  return (
    <div className="card-surface p-5 mb-4 border-2 border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Shield size={14} className="text-primary" />
        <p className="text-xs font-700 text-primary uppercase tracking-wider">
          {t('REPARO အတည်ပြုထားသော မိတ်ဖက်', 'Verified Partner')}
        </p>
      </div>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-green">
          <span className="text-primary-foreground font-800 text-lg">
            {partner?.name?.split(' ')?.map(w => w?.[0])?.join('')?.slice(0, 2)}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-700 text-foreground text-base mb-0.5">{partner?.name}</p>
          <p className="text-sm text-muted-foreground mb-2">{partner?.specialty}</p>

          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-600">
              <CheckCircle2 size={11} />
              {t('အထောက်အထား စစ်ဆေးပြီး', 'Verified Partner')}
            </span>
            <span className="flex items-center gap-1 text-xs bg-warning/10 text-warning px-2.5 py-1 rounded-full font-600">
              <Star size={11} fill="currentColor" />
              {partner?.rating} ★
            </span>
            <span className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-500">
              <Shield size={11} />
              {t(`${partner?.repairsCompleted} ကြိမ် ပြင်ဆင်ပြီး`, `${partner?.repairsCompleted} repairs done`)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={13} className="text-primary" />
          <span className="font-500 text-sm">{partner?.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={13} className="text-primary" />
          <span className="font-500 text-sm">
            {t(`တုံ့ပြန်ချိန် - ${partner?.responseTime}`, `Responds ${partner?.responseTime}`)}
          </span>
        </div>
      </div>
    </div>
  );
}