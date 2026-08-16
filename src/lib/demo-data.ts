export type ItemScenario = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  damageLabels: {label: string;confidence: number;position: {top: string;left: string;};}[];
  scanDuration: number; // ms
};

export type DiagnosticResult = {
  scenarioId: string;
  recommendation: 'REPAIR' | 'RESELL' | 'DONATE' | 'RECYCLE';
  confidencePercent: number;
  diagnosisSummary: string;
  damageDescription: string;
  repairCostMMK: number;
  repairedValueMMK: number;
  replacementCostMMK: number;
  savingsMMK: number;
  co2eAvoidedKg: number;
  aiReasoning: string;
  repairTimeEstimate: string;
  repairComplexity: 'Low' | 'Medium' | 'High';
};

export type RepairPartner = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  repairsCompleted: number;
  verified: boolean;
  location: string;
  responseTime: string;
};

export type CityImpact = {
  city: string;
  co2eAvoidedKg: number;
  repairsCompleted: number;
  moneySavedMMK: number;
};

export type RecentRepair = {
  id: string;
  itemName: string;
  city: string;
  timeAgo: string;
  savedMMK: number;
  recommendation: 'REPAIR' | 'RESELL' | 'DONATE' | 'RECYCLE';
  userName: string;
};

// ─── Item Scenarios ───────────────────────────────────────────────────────────
export const ITEM_SCENARIOS: ItemScenario[] = [
{
  id: 'scenario-smartphone',
  name: 'Smartphone',
  category: 'Electronics',
  imageUrl: "https://images.unsplash.com/photo-1556232503-fcc25e3774a0",
  imageAlt: 'Cracked smartphone with damaged display and minor frame dents on wooden surface',
  damageLabels: [
  { label: 'Cracked display', confidence: 97, position: { top: '30%', left: '25%' } },
  { label: 'Frame dent', confidence: 82, position: { top: '65%', left: '60%' } }],

  scanDuration: 2200
},
{
  id: 'scenario-backpack',
  name: 'Backpack',
  category: 'Textile',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ddd12c00-1772915198732.png",
  imageAlt: 'Green canvas backpack with broken zipper and minor fabric wear on shoulder strap',
  damageLabels: [
  { label: 'Broken zipper', confidence: 95, position: { top: '40%', left: '55%' } },
  { label: 'Minor fabric wear', confidence: 74, position: { top: '70%', left: '30%' } }],

  scanDuration: 1800
},
{
  id: 'scenario-appliance',
  name: 'Old Appliance',
  category: 'Appliance',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc7cd09e-1766987702003.png",
  imageAlt: 'Old electric fan with cracked housing, burnt motor area and corroded internal components',
  damageLabels: [
  { label: 'Severe internal damage', confidence: 91, position: { top: '50%', left: '45%' } },
  { label: 'Burnt motor area', confidence: 88, position: { top: '35%', left: '55%' } },
  { label: 'Corroded components', confidence: 79, position: { top: '65%', left: '35%' } }],

  scanDuration: 2600
}];


// ─── Diagnostic Results ───────────────────────────────────────────────────────
export const DIAGNOSTIC_RESULTS: Record<string, DiagnosticResult> = {
  'scenario-smartphone': {
    scenarioId: 'scenario-smartphone',
    recommendation: 'REPAIR',
    confidencePercent: 94,
    diagnosisSummary: 'Cracked display with minor frame damage',
    damageDescription: 'Screen glass shattered across upper-left quadrant. LCD layer intact. Frame shows cosmetic denting on two edges. Battery health unaffected.',
    repairCostMMK: 75000,
    repairedValueMMK: 185000,
    replacementCostMMK: 420000,
    savingsMMK: 345000,
    co2eAvoidedKg: 18.4,
    aiReasoning: 'Repair cost is estimated at only 18% of replacement cost. Display replacement is a high-success, reversible repair. Repaired resale value of K 185,000 makes this economically sound. Repairing avoids 18.4 kg CO₂e versus manufacturing a new device.',
    repairTimeEstimate: '2–3 hours',
    repairComplexity: 'Medium'
  },
  'scenario-backpack': {
    scenarioId: 'scenario-backpack',
    recommendation: 'REPAIR',
    confidencePercent: 89,
    diagnosisSummary: 'Broken zipper + minor fabric damage',
    damageDescription: 'Main compartment zipper slider detached. Zipper teeth intact — slider replacement sufficient. Shoulder strap shows surface abrasion, no structural compromise.',
    repairCostMMK: 18000,
    repairedValueMMK: 65000,
    replacementCostMMK: 85000,
    savingsMMK: 67000,
    co2eAvoidedKg: 3.2,
    aiReasoning: 'Zipper replacement is a low-cost, high-success repair. At K 18,000 repair cost versus K 85,000 replacement, you save K 67,000 (79%). Textile repair avoids 3.2 kg CO₂e from new fabric production and shipping.',
    repairTimeEstimate: '45 min – 1 hour',
    repairComplexity: 'Low'
  },
  'scenario-appliance': {
    scenarioId: 'scenario-appliance',
    recommendation: 'DONATE',
    confidencePercent: 87,
    diagnosisSummary: 'Severe internal damage — not repair-viable',
    damageDescription: 'Motor winding shows thermal damage consistent with overload failure. Internal corrosion on control board. Repair cost would exceed 85% of replacement value. Risk of recurrence within 3 months is high.',
    repairCostMMK: 42000,
    repairedValueMMK: 15000,
    replacementCostMMK: 55000,
    savingsMMK: 0,
    co2eAvoidedKg: 2.1,
    aiReasoning: 'Repair cost of K 42,000 exceeds the repaired resale value of K 15,000, making this economically unviable. Donating to a certified e-waste partner recovers usable parts and avoids 2.1 kg CO₂e from landfill disposal. This is the responsible circular path.',
    repairTimeEstimate: 'N/A',
    repairComplexity: 'High'
  }
};

// ─── Repair Partners ──────────────────────────────────────────────────────────
export const REPAIR_PARTNERS: RepairPartner[] = [
{
  id: 'partner-001',
  name: 'Kyaw Zin Electronics',
  specialty: 'Smartphones & Tablets',
  rating: 4.9,
  repairsCompleted: 326,
  verified: true,
  location: 'Sanchaung, Yangon',
  responseTime: '< 30 min'
},
{
  id: 'partner-002',
  name: 'Thida Tailoring & Repair',
  specialty: 'Textiles & Bags',
  rating: 4.8,
  repairsCompleted: 214,
  verified: true,
  location: 'Bahan, Yangon',
  responseTime: '< 45 min'
},
{
  id: 'partner-003',
  name: 'Aung Myint Appliance Care',
  specialty: 'Home Appliances',
  rating: 4.7,
  repairsCompleted: 189,
  verified: true,
  location: 'Mandalay City Center',
  responseTime: '< 1 hour'
}];


// ─── City Impact ──────────────────────────────────────────────────────────────
export const CITY_IMPACTS: CityImpact[] = [
{ city: 'Yangon', co2eAvoidedKg: 12840, repairsCompleted: 3240, moneySavedMMK: 486000000 },
{ city: 'Mandalay', co2eAvoidedKg: 8420, repairsCompleted: 2180, moneySavedMMK: 327000000 },
{ city: 'Naypyidaw', co2eAvoidedKg: 2640, repairsCompleted: 680, moneySavedMMK: 102000000 },
{ city: 'Mawlamyine', co2eAvoidedKg: 1840, repairsCompleted: 476, moneySavedMMK: 71400000 }];


// ─── Recent Repairs Feed ──────────────────────────────────────────────────────
export const RECENT_REPAIRS: RecentRepair[] = [
{ id: 'repair-001', itemName: 'iPhone 13 Pro', city: 'Yangon', timeAgo: '2 min ago', savedMMK: 345000, recommendation: 'REPAIR', userName: 'Kyaw T.' },
{ id: 'repair-002', itemName: 'Canvas Backpack', city: 'Mandalay', timeAgo: '8 min ago', savedMMK: 67000, recommendation: 'REPAIR', userName: 'Thida M.' },
{ id: 'repair-003', itemName: 'Standing Fan', city: 'Yangon', timeAgo: '14 min ago', savedMMK: 0, recommendation: 'DONATE', userName: 'Aung K.' },
{ id: 'repair-004', itemName: 'Leather Wallet', city: 'Bago', timeAgo: '22 min ago', savedMMK: 28000, recommendation: 'REPAIR', userName: 'Zin M.' },
{ id: 'repair-005', itemName: 'Samsung Galaxy A54', city: 'Mandalay', timeAgo: '31 min ago', savedMMK: 210000, recommendation: 'REPAIR', userName: 'Su Su K.' },
{ id: 'repair-006', itemName: 'Rice Cooker', city: 'Yangon', timeAgo: '45 min ago', savedMMK: 42000, recommendation: 'REPAIR', userName: 'Htet A.' },
{ id: 'repair-007', itemName: 'Old Laptop', city: 'Naypyidaw', timeAgo: '1 hr ago', savedMMK: 0, recommendation: 'RECYCLE', userName: 'Win M.' }];


// ─── Community Totals ─────────────────────────────────────────────────────────
export const COMMUNITY_TOTALS = {
  totalRepairs: 6576,
  totalCo2eAvoidedKg: 25740,
  totalMoneySavedMMK: 986400000,
  activeRepairShops: 48,
  citiesCovered: 12
};

// ─── Personal Impact (demo user) ─────────────────────────────────────────────
export const PERSONAL_IMPACT = {
  itemsKeptInUse: 7,
  co2eAvoidedKg: 42.8,
  moneySavedMMK: 386000,
  repairsCompleted: 7
};

// ─── How It Works Steps ───────────────────────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
{
  id: 'step-scan',
  step: '01',
  title: 'Scan Your Item',
  description: 'Take a photo of your broken item. Our AI analyzes damage and evaluates repair viability in seconds.',
  icon: 'Camera'
},
{
  id: 'step-decide',
  step: '02',
  title: 'Get AI Decision',
  description: 'Receive a clear recommendation — Repair, Resell, Donate, or Recycle — with full cost breakdown in MMK.',
  icon: 'Cpu'
},
{
  id: 'step-repair',
  step: '03',
  title: 'Book Pickup',
  description: 'A verified REPARO rider picks up your item and delivers it to the nearest certified repair partner.',
  icon: 'Bike'
},
{
  id: 'step-impact',
  step: '04',
  title: 'Track Your Impact',
  description: 'Watch your item get repaired live. See exactly how much CO₂e you avoided and money you saved.',
  icon: 'Leaf'
}];