'use client';

import React, { useState } from 'react';
import ScenarioSelector from './ScenarioSelector';
import ScanningView from './ScanningView';
import { ITEM_SCENARIOS, ItemScenario } from '@/lib/demo-data';

type FlowState = 'select' | 'scanning';

export default function DiagnosticFlow() {
  const [flowState, setFlowState] = useState<FlowState>('select');
  const [selectedScenario, setSelectedScenario] = useState<ItemScenario>(ITEM_SCENARIOS[0]);

  const handleStartScan = (scenario: ItemScenario) => {
    setSelectedScenario(scenario);
    setFlowState('scanning');
  };

  const handleReset = () => {
    setFlowState('select');
  };

  if (flowState === 'scanning') {
    return <ScanningView scenario={selectedScenario} onReset={handleReset} />;
  }

  return <ScenarioSelector onStart={handleStartScan} />;
}