import React from 'react';
import { Wrench, Tag, Heart, RefreshCw, CheckCircle2 } from 'lucide-react';
import { DiagnosticResult } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

interface RecommendationCardProps {
  result: DiagnosticResult;
  recConfig: ReturnType<typeof import('@/lib/ai-mock').getRecommendationConfig>;
}

const REC_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  REPAIR: Wrench,
  RESELL: Tag,
  DONATE: Heart,
  RECYCLE: RefreshCw,
};

export default function RecommendationCard({ result, recConfig }: RecommendationCardProps) {
  const { t } = useLanguage();
  const Icon = REC_ICONS[result.recommendation] || Wrench;

  return (
    <div className={`rounded-2xl p-5 mb-4 border-2 ${recConfig.bgLight} ${recConfig.borderColor}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 rounded-xl ${recConfig.color} flex items-center justify-center shadow-card`}>
          <Icon size={22} className={recConfig.textColor} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`text-lg font-800 ${recConfig.textLight}`}>{t(recConfig.label === 'Repair Recommended' ? 'ပြင်ဆင်ရန် အကြံပြုသည်' : recConfig.label === 'Resell Recommended' ? 'ပြန်လည်ရောင်းချရန် အကြံပြုသည်' : recConfig.label === 'Donate Recommended' ? 'လှူဒါန်းရန် အကြံပြုသည်' : 'ပြန်လည်အသုံးပြုရန်', recConfig.label)}</h2>
            <CheckCircle2 size={16} className={recConfig.textLight} />
          </div>
          <p className="text-xs text-muted-foreground font-500">{t('AI အကြံပြုချက်', 'AI Recommendation')}</p>
        </div>
      </div>

      <p className={`text-sm font-500 ${recConfig.textLight} leading-relaxed`}>
        {t(
          result.recommendation === 'REPAIR' ? 'ဤပစ္စည်းသည် ပြင်ဆင်ရန် ထိုက်တန်ပါသည်။ ငွေကြေးနှင့် ပတ်ဝန်းကျင်ဆိုင်ရာ သက်ရောက်မှုများမှာ ရှင်းလင်းလှပါသည်။' :
          result.recommendation === 'RESELL' ? 'ဤပစ္စည်းသည် ခိုင်မာသော ပြန်လည်ရောင်းချမှု တန်ဖိုးရှိသည်။ ပြင်ဆင်မည့်အစား ပြန်လည်ရောင်းချပါ။' :
          result.recommendation === 'DONATE' ? 'ပြင်ဆင်မှုသည် စီးပွားရေးအရ တွက်ခြေမကိုက်ပါ။ လှူဒါန်းခြင်းဖြင့် ဤပစ္စည်းကို နောက်တစ်ဖန် အသက်သွင်းပါ။' :
          'ဤပစ္စည်းသည် ပြင်ဆင်ရန် မဖြစ်နိုင်တော့ပါ။ အသိအမှတ်ပြု ပြန်လည်အသုံးပြုရေး မိတ်ဖက်များထံ ပို့ပေးပါ။',
          recConfig.description
        )}
      </p>

      {/* Confidence bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-500 text-muted-foreground mb-1.5">
          <span>{t('တိကျမှု', 'Confidence')}</span>
          <span className={`font-700 ${recConfig.textLight}`}>{result.confidencePercent}%</span>
        </div>
        <div className="h-2 bg-white/60 rounded-full overflow-hidden">
          <div
            className={`h-full ${recConfig.color} rounded-full`}
            style={{ width: `${result.confidencePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}