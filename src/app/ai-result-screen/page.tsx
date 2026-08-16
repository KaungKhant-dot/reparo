import React, { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import ResultScreenClient from './components/ResultScreenClient';

export default function AIResultScreen() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[#F7F5F0]"><div className="text-[#2D5A3D] text-lg font-medium">Loading results...</div></div>}>
        <ResultScreenClient />
      </Suspense>
    </AppLayout>
  );
}