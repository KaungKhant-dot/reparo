import React from 'react';
import { Wrench, Heart, RefreshCw, Clock, TrendingUp } from 'lucide-react';
import { RECENT_REPAIRS } from '@/lib/demo-data';
import Icon from '@/components/ui/AppIcon';


const REC_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  REPAIR: Wrench,
  DONATE: Heart,
  RECYCLE: RefreshCw,
  RESELL: TrendingUp,
};

const REC_COLORS: Record<string, string> = {
  REPAIR: 'bg-primary/10 text-primary',
  DONATE: 'bg-secondary/10 text-secondary',
  RECYCLE: 'bg-muted text-muted-foreground',
  RESELL: 'bg-accent/20 text-primary',
};

const REC_MYANMAR: Record<string, string> = {
  REPAIR: 'ပြင်ဆင်ရန်',
  DONATE: 'လှူဒါန်းရန်',
  RECYCLE: 'ပြန်လည်အသုံးပြုရန်',
  RESELL: 'ရောင်းချရန်',
};

export default function RecentRepairsFeed() {
  return (
    <section className="px-5 md:px-10 lg:px-16 py-10 md:py-14 bg-card/60">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-sm font-600 text-success uppercase tracking-widest">Live လုပ်ဆောင်မှု · Live Activity</p>
            </div>
            <h2 className="text-xl md:text-2xl font-700 text-foreground">မြန်မာနိုင်ငံတစ်ဝှမ်း မကြာသေးမီ ပြင်ဆင်မှုများ</h2>
            <p className="text-sm text-muted-foreground mt-1">Recent repairs across Myanmar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {RECENT_REPAIRS.map((repair) => {
            const RepairIcon = REC_ICON[repair.recommendation] || Wrench;
            const colorClass = REC_COLORS[repair.recommendation] || REC_COLORS.REPAIR;
            const mmLabel = REC_MYANMAR[repair.recommendation] || repair.recommendation;

            return (
              <div
                key={repair.id}
                className="card-surface p-4 flex items-center gap-4 hover:shadow-elevated transition-shadow duration-200"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <RepairIcon size={18} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-600 text-foreground text-sm truncate">{repair.itemName}</p>
                    <span className={`text-xs font-600 px-2 py-0.5 rounded-full flex-shrink-0 ${colorClass}`}>
                      {mmLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-500">{repair.userName}</span>
                    <span>·</span>
                    <span>{repair.city}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {repair.timeAgo}
                    </span>
                  </div>
                </div>

                {/* Savings */}
                {repair.savedMMK > 0 && (
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground font-500">သက်သာငွေ</p>
                    <p className="text-sm font-700 text-success">K {repair.savedMMK.toLocaleString()}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}