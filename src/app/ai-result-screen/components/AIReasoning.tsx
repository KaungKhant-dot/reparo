import React from 'react';
import { Cpu } from 'lucide-react';
import { DiagnosticResult } from '@/lib/demo-data';
import { useLanguage } from '@/lib/language-context';

interface AIReasoningProps {
  result: DiagnosticResult;
}

export default function AIReasoning({ result }: AIReasoningProps) {
  const { t } = useLanguage();

  return (
    <div className="card-surface p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 gradient-primary rounded-lg flex items-center justify-center">
          <Cpu size={13} className="text-primary-foreground" />
        </div>
        <h3 className="font-700 text-foreground text-sm">{t('AI ဆုံးဖြတ်ချက်', 'AI Reasoning')}</h3>
        <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-600">
          {t('ဖွင့်ဟသော', 'Transparent')}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {result.aiReasoning}
      </p>

      {/* Damage breakdown */}
      <div className="border-t border-border pt-4">
        <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mb-3">
          {t('ပျက်စီးမှု စစ်ဆေးချက်', 'Damage Analysis')}
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          {result.damageDescription}
        </p>
      </div>
    </div>
  );
}