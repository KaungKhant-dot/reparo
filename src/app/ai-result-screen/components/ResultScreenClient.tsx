'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ITEM_SCENARIOS } from '@/lib/demo-data';
import { getDiagnosticResult, getRecommendationConfig } from '@/lib/ai-mock';
import DiagnosisHeader from './DiagnosisHeader';
import RecommendationCard from './RecommendationCard';
import EconomicComparison from './EconomicComparison';
import ImpactBadges from './ImpactBadges';
import AIReasoning from './AIReasoning';
import PartnerCard from './PartnerCard';
import ResultCTAs from './ResultCTAs';
import ScenarioSwitcher from './ScenarioSwitcher';

export default function ResultScreenClient() {
  const searchParams = useSearchParams();
  const scenarioParam = searchParams?.get('scenario') || 'scenario-smartphone';

  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    ITEM_SCENARIOS?.find(s => s?.id === scenarioParam)?.id || 'scenario-smartphone'
  );

  const scenario = ITEM_SCENARIOS?.find(s => s?.id === activeScenarioId) || ITEM_SCENARIOS?.[0];
  const result = getDiagnosticResult(activeScenarioId);
  const recConfig = getRecommendationConfig(result?.recommendation);

  return (
    <div className="min-h-screen px-5 md:px-10 lg:px-16 py-6 md:py-10">
      <div className="max-w-2xl mx-auto">
        {/* Demo scenario switcher */}
        <ScenarioSwitcher
          scenarios={ITEM_SCENARIOS}
          activeId={activeScenarioId}
          onChange={setActiveScenarioId}
        />

        {/* Diagnosis header */}
        <DiagnosisHeader scenario={scenario} result={result} />

        {/* Recommendation card */}
        <RecommendationCard result={result} recConfig={recConfig} />

        {/* Economic comparison */}
        {result?.recommendation === 'REPAIR' && (
          <EconomicComparison result={result} />
        )}

        {/* Impact badges */}
        <ImpactBadges result={result} />

        {/* AI Reasoning */}
        <AIReasoning result={result} />

        {/* Partner card (only for REPAIR) */}
        {result?.recommendation === 'REPAIR' && (
          <PartnerCard />
        )}

        {/* CTAs */}
        <ResultCTAs result={result} />
      </div>
    </div>
  );
}