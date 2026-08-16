'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Cpu, CheckCircle2 } from 'lucide-react';
import { ItemScenario } from '@/lib/demo-data';
import { SCAN_PHASES, ScanProgress } from '@/lib/ai-mock';
import { useLanguage } from '@/lib/language-context';

interface ScanningViewProps {
  scenario: ItemScenario;
  onReset: () => void;
}

export default function ScanningView({ scenario, onReset }: ScanningViewProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [visibleChips, setVisibleChips] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase: ScanProgress = SCAN_PHASES[Math.min(phaseIndex, SCAN_PHASES.length - 1)];
  const isLastPhase = phaseIndex >= SCAN_PHASES.length - 1;

  useEffect(() => {
    const phaseTimings = [400, 900, 900, 700, 600];
    let currentIdx = 0;

    const advance = () => {
      if (currentIdx < SCAN_PHASES.length - 1) {
        currentIdx++;
        setPhaseIndex(currentIdx);

        // Show damage chips progressively during analyzing phase
        if (currentIdx === 1) {
          scenario.damageLabels.forEach((_, i) => {
            setTimeout(() => {
              setVisibleChips(prev => [...prev, i]);
            }, i * 600);
          });
        }
      } else {
        setIsComplete(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => {
          router.push(`/ai-result-screen?scenario=${scenario.id}`);
        }, 800);
      }
    };

    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += 100;
      const totalTime = phaseTimings.slice(0, currentIdx + 1).reduce((a, b) => a + b, 0);
      if (elapsed >= phaseTimings[currentIdx]) {
        advance();
        elapsed = 0;
      }
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-600 text-primary uppercase tracking-wider">{t('စကင်ဖတ်နေသည်', 'Scanning')}</span>
          </div>
          <button
            onClick={onReset}
            className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors"
            aria-label="Cancel scan"
          >
            <X size={14} />
          </button>
        </div>

        {/* Image with scan overlay */}
        <div className="relative rounded-2xl overflow-hidden bg-foreground/5 aspect-square mb-6 shadow-elevated">
          <Image
            src={scenario.imageUrl}
            alt={scenario.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-foreground/20" />

          {/* Corner brackets */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
            <div
              key={`corner-${corner}`}
              className={`absolute w-8 h-8 border-primary border-2 ${
                corner === 'top-left' ? 'top-3 left-3 border-r-0 border-b-0 rounded-tl-lg' :
                corner === 'top-right' ? 'top-3 right-3 border-l-0 border-b-0 rounded-tr-lg' :
                corner === 'bottom-left'? 'bottom-3 left-3 border-r-0 border-t-0 rounded-bl-lg' : 'bottom-3 right-3 border-l-0 border-t-0 rounded-br-lg'
              }`}
            />
          ))}

          {/* Animated scan line */}
          {!isComplete && (
            <div
              className="absolute left-0 right-0 h-0.5 bg-primary shadow-green scan-line-animation"
              style={{ top: 0 }}
            />
          )}

          {/* Damage detection chips */}
          {scenario.damageLabels.map((dmg, i) => (
            <div
              key={`dmg-${scenario.id}-${i}`}
              className={`absolute transition-all duration-300 ${visibleChips.includes(i) ? 'opacity-100' : 'opacity-0'}`}
              style={{ top: dmg.position.top, left: dmg.position.left }}
            >
              <div className="bg-error text-white text-xs font-600 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                {dmg.label}
                <span className="opacity-80">{dmg.confidence}%</span>
              </div>
              {/* Connector dot */}
              <div className="w-2 h-2 rounded-full border-2 border-error bg-white absolute -bottom-3 left-1/2 -translate-x-1/2" />
            </div>
          ))}

          {/* Complete overlay */}
          {isComplete && (
            <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-green">
                <CheckCircle2 size={32} className="text-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Item label */}
        <div className="text-center mb-5">
          <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mb-1">{scenario.category}</p>
          <p className="font-700 text-foreground text-lg">{scenario.name}</p>
        </div>

        {/* Progress phases */}
        <div className="card-surface p-5 mb-5">
          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${currentPhase.progressPercent}%` }}
            />
          </div>

          {/* Phase messages */}
          <div className="space-y-2">
            {SCAN_PHASES.slice(0, -1).map((phase, i) => {
              const isDone = i < phaseIndex;
              const isActive = i === phaseIndex;
              return (
                <div
                  key={`phase-${phase.phase}`}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    isActive ? 'opacity-100' : isDone ? 'opacity-50' : 'opacity-25'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDone ? 'bg-primary' : isActive ? 'bg-primary/20 border-2 border-primary' : 'bg-muted'
                  }`}>
                    {isDone ? (
                      <CheckCircle2 size={12} className="text-primary-foreground" />
                    ) : isActive ? (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    ) : null}
                  </div>
                  <div>
                    <p className={`text-sm font-600 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {phase.message}
                    </p>
                    {isActive && (
                      <p className="text-xs text-muted-foreground">{phase.subMessage}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confidence meter */}
        <div className="card-surface p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-primary" />
              <span className="text-xs font-600 text-muted-foreground uppercase tracking-wider">{t('AI တိကျမှု', 'AI Confidence')}</span>
            </div>
            <span className="text-lg font-800 text-primary counter-animate">
              {isComplete ? '94' : currentPhase.confidenceBuilding}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${isComplete ? 94 : currentPhase.confidenceBuilding}%` }}
            />
          </div>
        </div>

        {isComplete && (
          <div className="text-center animate-float-up">
            <p className="text-primary font-700 text-sm flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              {t('စစ်ဆေးမှု ပြီးဆုံးသည် — ရလဒ် ဖွင့်နေသည်...', 'Scanning complete — opening results...')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}