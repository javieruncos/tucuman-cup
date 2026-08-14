"use client";

import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Radio } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { useMatches } from "@/hooks/useMatches";

function TickerItem({
  homeShort,
  homeScore,
  awayShort,
  awayScore,
  homeColor,
  awayColor,
}: {
  homeShort: string;
  homeScore: number;
  awayShort: string;
  awayScore: number;
  homeColor: string;
  awayColor: string;
}) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 px-6 text-xs font-medium">
      <span
        className="font-semibold tabular-nums"
        style={{ color: homeColor }}
      >
        {homeShort}
      </span>
      <span className="rounded-[4px] bg-surface-2 px-1.5 py-0.5 font-heading font-bold tabular-nums text-foreground">
        {homeScore}–{awayScore}
      </span>
      <span
        className="font-semibold tabular-nums"
        style={{ color: awayColor }}
      >
        {awayShort}
      </span>
      <span className="ml-3 size-1 rounded-full bg-border" aria-hidden="true" />
    </li>
  );
}

export function TickerBar() {
  const x = useMotionValue(0);
  const paused = useRef(false);
  const { data: matches = [], isLoading, error } = useMatches();

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    x.set((x.get() - 0.035 * delta) % 0);
    if (x.get() < -50) x.set(0);
  });

  if (isLoading || error) return null;

  const results = matches
    .filter((match) => match.status === "finished")
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  if (results.length === 0) return null;

  const items = [...results, ...results];

  return (
    <aside
      className="relative z-10 border-y border-border/40 bg-surface-1/60 backdrop-blur-sm"
      aria-label="Resultados recientes"
    >
      <Container clean className="flex max-w-7xl items-stretch px-4 sm:px-6 lg:px-8">
        <div className="z-10 flex shrink-0 items-center gap-2 border-r border-border/60 bg-surface-1/60 pr-4">
          <Radio className="size-3.5 text-danger" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Resultados
          </span>
        </div>
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 3%, black 97%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 3%, black 97%, transparent 100%)",
          }}
        >
          <motion.ul
            className="flex w-max py-2"
            style={{ x }}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            onFocus={() => (paused.current = true)}
            onBlur={() => (paused.current = false)}
          >
            {items.map((match, index) => (
              <TickerItem
                key={`${match._id}-${index}`}
                homeShort={match.homeTeam.shortName}
                homeScore={match.homeScore}
                awayShort={match.awayTeam.shortName}
                awayScore={match.awayScore}
                homeColor={match.homeTeam.color}
                awayColor={match.awayTeam.color}
              />
            ))}
          </motion.ul>
        </div>
      </Container>
    </aside>
  );
}