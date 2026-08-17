import React from 'react';
import { TrendingDown, Wrench, ShoppingCart, TrendingUp } from 'lucide-react';
import { DiagnosticResult } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

interface EconomicComparisonProps {
  result: DiagnosticResult;
}

export default function EconomicComparison({ result }: EconomicComparisonProps) {
  const { t } = useLanguage();
  const repairPct = Math.round((result.repairCostMMK / result.replacementCostMMK) * 100);

  return (
    <div className="card-surface p-5 mb-4">
      <h3 className="font-700 text-foreground text-sm mb-4 flex items-center gap-2">
        <TrendingDown size={15} className="text-primary" />
        {t('ကုန်ကျစရိတ် နှိုင်းယှဉ်ချက်', 'Cost Comparison')}
      </h3>

      {/* Three columns */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {/* Repair cost */}
        <div className="bg-primary/5 rounded-xl p-3 text-center border border-primary/20 flex flex-col justify-between min-h-[120px]">
          <div>
            <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Wrench size={14} className="text-success" />
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground font-600 mb-1 leading-normal">
              {t('ပြင်ဆင်ခ', 'Repair Cost')}
            </p>
          </div>
          <p className="text-xs md:text-sm font-800 text-success whitespace-nowrap">
            K {result.repairCostMMK.toLocaleString()}
          </p>
        </div>

        {/* Repaired value */}
        <div className="bg-muted rounded-xl p-3 text-center flex flex-col justify-between min-h-[120px]">
          <div>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp size={14} className="text-primary" />
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground font-600 mb-1 leading-normal">
              {t('ပြင်ပြီးတန်ဖိုး', 'Repaired Value')}
            </p>
          </div>
          <p className="text-xs md:text-sm font-800 text-foreground whitespace-nowrap">
            K {result.repairedValueMMK.toLocaleString()}
          </p>
        </div>

        {/* Replacement */}
        <div className="bg-error/5 rounded-xl p-3 text-center border border-error/20 flex flex-col justify-between min-h-[120px]">
          <div>
            <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ShoppingCart size={14} className="text-error" />
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground font-600 mb-1 leading-normal">
              {t('အသစ်ဝယ်ယူခ', 'Replacement')}
            </p>
          </div>
          <p className="text-xs md:text-sm font-800 text-error whitespace-nowrap">
            K {result.replacementCostMMK.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Savings highlight */}
      <div className="bg-success/10 border border-success/30 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-600 text-success uppercase tracking-wider mb-0.5">
            {t('သင် သက်သာသည်', 'You Save')}
          </p>
          <p className="text-2xl font-800 text-success counter-animate">
            K {result.savingsMMK.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground font-500 mt-0.5">
            {t('အသစ်ဝယ်သည်ထက် နှိုင်းယှဉ်လျှင်', 'Compared to buying new')}
          </p>
        </div>
        <div className="text-right">
          <div className="w-16 h-16 flex items-center justify-center">
            <div className="relative">
              <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="var(--muted)" strokeWidth="6" />
                <circle
                  cx="32" cy="32" r="26"
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (repairPct / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center rotate-90">
                <span className="text-xs font-800 text-success">{repairPct}%</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-500">{t('အသစ်ဝယ်ယူမှု၏ ရာခိုင်နှုန်း', 'of replacement cost')}</p>
        </div>
      </div>
    </div>
  );
}