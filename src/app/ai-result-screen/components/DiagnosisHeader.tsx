import React from 'react';
import Image from 'next/image';
import { Shield, AlertCircle } from 'lucide-react';
import { ItemScenario } from '@/lib/demo-data';
import { DiagnosticResult } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

interface DiagnosisHeaderProps {
  scenario: ItemScenario;
  result: DiagnosticResult;
}

export default function DiagnosisHeader({ scenario, result }: DiagnosisHeaderProps) {
  const { t } = useLanguage();
  const confidenceColor =
    result.confidencePercent >= 90 ? 'text-success' :
    result.confidencePercent >= 75 ? 'text-accent' : 'text-warning';

  return (
    <div className="card-surface p-5 mb-4 flex items-start gap-4">
      {/* Item thumbnail */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative bg-muted">
        <Image
          src={scenario.imageUrl}
          alt={scenario.imageAlt}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Diagnosis info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h1 className="font-800 text-foreground text-lg">{scenario.name}</h1>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-500">
            {scenario.category}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{result.diagnosisSummary}</p>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Confidence */}
          <div className="flex items-center gap-1.5">
            <Shield size={13} className={confidenceColor} />
            <span className={`text-sm font-700 ${confidenceColor}`}>{t(`${result.confidencePercent}% တိကျမှု`, `${result.confidencePercent}% confidence`)}</span>
          </div>

          {/* Complexity */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-600 ${
            result.repairComplexity === 'Low' ? 'bg-primary/10 text-primary' :
            result.repairComplexity === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
          }`}>
            <AlertCircle size={11} />
            {t(
              result.repairComplexity === 'Low' ? 'လွယ်ကူ' : result.repairComplexity === 'Medium' ? 'အလတ်စား' : 'ခက်ခဲ',
              result.repairComplexity
            )}
          </div>

          {/* Time estimate */}
          {result.repairTimeEstimate !== 'N/A' && (
            <span className="text-xs text-muted-foreground font-500">
              ⏱ {result.repairTimeEstimate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}