"use client";

import { motion } from "framer-motion";

export function MatchStatBars({
  label,
  stats,
  homeColor,
  awayColor,
  index = 0,
}: {
  label: string;
  stats: [number, number];
  homeColor: string;
  awayColor: string;
  index?: number;
}) {
  const [home, away] = stats;
  const total = home + away;
  const homePct = total === 0 ? 50 : Math.round((home / total) * 100);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <span className="tabular font-display text-sm font-semibold text-foreground sm:text-base">
          {home}
        </span>
        <div className="flex h-0.5 flex-1 gap-0.5 overflow-hidden">
          <div className="flex flex-1 justify-end overflow-hidden bg-surface-3/40">
            <motion.div
              className="h-full"
              style={{ background: homeColor }}
              initial={{ width: 0 }}
              animate={{ width: `${homePct}%` }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: "easeOut" }}
            />
          </div>
          <div className="flex flex-1 overflow-hidden bg-surface-3/40">
            <motion.div
              className="h-full opacity-70"
              style={{ background: awayColor }}
              initial={{ width: 0 }}
              animate={{ width: `${100 - homePct}%` }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: "easeOut" }}
            />
          </div>
        </div>
        <span className="tabular font-display text-sm font-semibold text-foreground sm:text-base">
          {away}
        </span>
      </div>
    </div>
  );
}