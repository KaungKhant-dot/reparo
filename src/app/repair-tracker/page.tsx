import React, { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import RepairTrackerClient from './components/RepairTrackerClient';

export default function RepairTrackerPage() {
  return (
    <AppLayout>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <RepairTrackerClient />
      </Suspense>
    </AppLayout>
  );
}
