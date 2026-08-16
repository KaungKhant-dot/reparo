'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { ItemScenario } from '@/lib/demo-data';

interface ScenarioSwitcherProps {
  scenarios: ItemScenario[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function ScenarioSwitcher({ scenarios, activeId, onChange }: ScenarioSwitcherProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Info size={13} className="text-accent" />
        <p className="text-xs font-600 text-accent uppercase tracking-wider">Demo Scenario Switcher</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-600 border-2 transition-all duration-200 ${
              activeId === s.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}