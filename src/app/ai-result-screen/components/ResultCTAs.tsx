import React from 'react';
import Link from 'next/link';
import { Wrench, Tag, Heart, RefreshCw, ArrowLeft, Share2 } from 'lucide-react';
import { DiagnosticResult } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

interface ResultCTAsProps {
  result: DiagnosticResult;
}

export default function ResultCTAs({ result }: ResultCTAsProps) {
  const { t } = useLanguage();
  const isRepair = result.recommendation === 'REPAIR';

  return (
    <div className="space-y-3 mb-8">
      {/* Primary CTA */}
      {isRepair ? (
        <Link
          href="/repair-tracker"
          className="btn-primary w-full justify-center text-base py-4"
        >
          <Wrench size={18} />
          {t('REPARO ဖြင့် ပြင်ဆင်ရန်', 'Repair with REPARO')}
        </Link>
      ) : result.recommendation === 'DONATE' ? (
        <Link
          href="/ai-result-screen"
          className="btn-secondary w-full justify-center text-base py-4"
        >
          <Heart size={18} />
          {t('လှူဒါန်းရန်', 'Donate this Item')}
        </Link>
      ) : (
        <Link
          href="/ai-result-screen"
          className="btn-secondary w-full justify-center text-base py-4"
        >
          <RefreshCw size={18} />
          {t('Recycling မိတ်ဖက် ရှာရန်', 'Find Recycling Partner')}
        </Link>
      )}

      {/* Secondary CTAs */}
      <div className="grid grid-cols-2 gap-3">
        {isRepair && (
          <button className="btn-outline justify-center text-sm py-3">
            <Tag size={15} />
            {t('ရောင်းချရန်', 'Resell')}
          </button>
        )}
        <button
          className={`btn-outline justify-center text-sm py-3 ${isRepair ? '' : 'col-span-2'}`}
        >
          <Share2 size={15} />
          {t('မျှဝေရန်', 'Share')}
        </button>
      </div>

      {/* Business model signal */}
      {isRepair && (
        <div className="card-surface p-4 mt-2">
          <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mb-3">
            {t('ငွေပေးချေမှု', 'Payment Breakdown')}
          </p>
          <div className="space-y-2">
            {[
              { id: 'pay-customer', label: t('သင် ပေးချေသည်', 'You pay'), amount: result.repairCostMMK, color: 'text-foreground' },
              { id: 'pay-partner', label: t('ပြင်ဆင်သူ ရရှိသည်', 'Partner receives'), amount: Math.round(result.repairCostMMK * 0.9), color: 'text-success' },
              { id: 'pay-fee', label: t('REPARO ဝန်ဆောင်ခ', 'Service fee'), amount: Math.round(result.repairCostMMK * 0.1), color: 'text-muted-foreground' },
            ].map((row) => (
              <div key={row.id} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-500">{row.label}</span>
                <span className={`font-700 counter-animate ${row.color}`}>
                  K {row.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="text-center pt-2">
        <Link
          href="/ai-diagnostic-screen"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-500"
        >
          <ArrowLeft size={14} />
          {t('အခြားပစ္စည်း စကင်ဖတ်ရန်', 'Scan another item')}
        </Link>
      </div>
    </div>
  );
}