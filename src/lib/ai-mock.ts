import { DIAGNOSTIC_RESULTS, DiagnosticResult } from './demo-data';

export type ScanPhase = 
  | 'idle' |'uploading' |'analyzing-condition' |'comparing-economics' |'estimating-impact' |'complete';

export type ScanProgress = {
  phase: ScanPhase;
  message: string;
  subMessage: string;
  progressPercent: number;
  confidenceBuilding: number;
};

export const SCAN_PHASES: ScanProgress[] = [
  {
    phase: 'uploading',
    message: 'Processing image...',
    subMessage: 'Preparing visual analysis pipeline',
    progressPercent: 12,
    confidenceBuilding: 0,
  },
  {
    phase: 'analyzing-condition',
    message: 'Analyzing condition...',
    subMessage: 'Detecting damage patterns and severity',
    progressPercent: 38,
    confidenceBuilding: 35,
  },
  {
    phase: 'comparing-economics',
    message: 'Comparing repair economics...',
    subMessage: 'Cross-referencing local repair cost database',
    progressPercent: 68,
    confidenceBuilding: 72,
  },
  {
    phase: 'estimating-impact',
    message: 'Estimating circular impact...',
    subMessage: 'Calculating CO₂e avoided vs replacement',
    progressPercent: 88,
    confidenceBuilding: 89,
  },
  {
    phase: 'complete',
    message: 'Analysis complete',
    subMessage: 'Recommendation ready',
    progressPercent: 100,
    confidenceBuilding: 94,
  },
];

// Deterministic: always returns the same result for the same scenarioId
export function getDiagnosticResult(scenarioId: string): DiagnosticResult {
  const result = DIAGNOSTIC_RESULTS[scenarioId];
  if (!result) {
    return DIAGNOSTIC_RESULTS['scenario-smartphone'];
  }
  return result;
}

export function getRecommendationConfig(recommendation: string) {
  const configs = {
    REPAIR: {
      label: 'Repair Recommended',
      color: 'bg-success',
      textColor: 'text-white',
      borderColor: 'border-success',
      bgLight: 'bg-green-50',
      textLight: 'text-success',
      icon: 'Wrench',
      description: 'This item is worth repairing. The economics and environmental case are clear.',
    },
    RESELL: {
      label: 'Resell Recommended',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      borderColor: 'border-accent',
      bgLight: 'bg-amber-50',
      textLight: 'text-amber-700',
      icon: 'Tag',
      description: 'This item has strong resale value. Sell it instead of repairing.',
    },
    DONATE: {
      label: 'Donate Recommended',
      color: 'bg-secondary',
      textColor: 'text-white',
      borderColor: 'border-secondary',
      bgLight: 'bg-blue-50',
      textLight: 'text-secondary',
      icon: 'Heart',
      description: 'Repair is not economically viable. Donating gives this item a second life.',
    },
    RECYCLE: {
      label: 'Responsible Recycling',
      color: 'bg-muted-foreground',
      textColor: 'text-white',
      borderColor: 'border-muted-foreground',
      bgLight: 'bg-gray-50',
      textLight: 'text-muted-foreground',
      icon: 'RefreshCw',
      description: 'This item is beyond repair. Certified recycling recovers valuable materials.',
    },
  };
  return configs[recommendation as keyof typeof configs] || configs.REPAIR;
}

export function formatMMK(amount: number): string {
  if (amount >= 1000000) {
    return `K ${(amount / 1000000).toFixed(1)}M`;
  }
  return `K ${amount.toLocaleString()}`;
}