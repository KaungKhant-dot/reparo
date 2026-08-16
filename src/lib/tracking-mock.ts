export type TrackingStatus = 
  | 'pickup-confirmed' |'rider-assigned' |'rider-arriving' |'item-collected' |'diagnosing' |'repairing' |'quality-check' |'returning' |'completed';

export type TrackingStage = {
  id: TrackingStatus;
  label: string;
  subLabel: string;
  isCompleted: boolean;
  isActive: boolean;
  eta?: string;
};

export type RiderInfo = {
  id: string;
  name: string;
  phone: string;
  rating: number;
  vehicleType: 'motorcycle' | 'bicycle';
  eta: string;
};

export const TRACKING_STAGES: Omit<TrackingStage, 'isCompleted' | 'isActive'>[] = [
  { id: 'pickup-confirmed', label: 'Pickup confirmed', subLabel: 'Order received by REPARO', eta: undefined },
  { id: 'rider-assigned', label: 'Rider assigned', subLabel: 'Kyaw Zin Min is on the way', eta: '12 min' },
  { id: 'item-collected', label: 'Item collected', subLabel: 'En route to repair partner', eta: '8 min' },
  { id: 'diagnosing', label: 'Item being diagnosed', subLabel: 'Partner confirming repair scope', eta: undefined },
  { id: 'repairing', label: 'Repairing', subLabel: 'Display replacement in progress', eta: '~2 hrs' },
  { id: 'quality-check', label: 'Quality check', subLabel: 'Testing all functions', eta: undefined },
  { id: 'returning', label: 'Returning to you', subLabel: 'Rider en route to your address', eta: '15 min' },
  { id: 'completed', label: 'Repair complete', subLabel: 'Item delivered successfully', eta: undefined },
];

export const DEMO_RIDER: RiderInfo = {
  id: 'rider-042',
  name: 'Kyaw Zin Min',
  phone: '+95 9 7654 3210',
  rating: 4.8,
  vehicleType: 'motorcycle',
  eta: '12 min',
};

export function buildStagesAtStatus(currentStatus: TrackingStatus): TrackingStage[] {
  const statusOrder = TRACKING_STAGES.map(s => s.id);
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  return TRACKING_STAGES.map((stage, idx) => ({
    ...stage,
    isCompleted: idx < currentIndex,
    isActive: idx === currentIndex,
  }));
}