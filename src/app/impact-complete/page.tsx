import React, { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import ImpactCompleteClient from './components/ImpactCompleteClient';

export default function ImpactCompletePage() {
  return (
    <AppLayout>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <ImpactCompleteClient />
      </Suspense>
    </AppLayout>
  );
}
