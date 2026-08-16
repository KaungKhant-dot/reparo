import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroSection from './components/HeroSection';
import CommunityStatsBar from './components/CommunityStatsBar';
import HowItWorksSection from './components/HowItWorksSection';
import RecentRepairsFeed from './components/RecentRepairsFeed';
import CityImpactSection from './components/CityImpactSection';
import HomeFooter from './components/HomeFooter';

export default function HomeScreen() {
  return (
    <AppLayout>
      <HeroSection />
      <CommunityStatsBar />
      <HowItWorksSection />
      <RecentRepairsFeed />
      <CityImpactSection />
      <HomeFooter />
    </AppLayout>
  );
}