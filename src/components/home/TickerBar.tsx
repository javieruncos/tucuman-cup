"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { Radio } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { useMatches } from "@/hooks/useMatches";
import type { MatchResponseType } from "@/types/matches";

function TickerItem({ match }: { match: MatchResponseType }) {
  return (
    <li
      aria-label={`${match.homeTeam.name} ${match.homeScore} a ${match.awayScore} ${match.awayTeam.name}`}
      className="flex shrink-0 items-center gap-4 border-l border-border/40 px-7 sm:gap-5 sm:px-9"
    >
      <span className="-ml-px hidden h-[68px] w-px bg-border/40 sm:block" aria-hidden="true" />
      <TeamCrest team={match.homeTeam} size={72} />
      <span
        className="max-w-[11ch] truncate text-2xl font-medium text-foreground"
        style={{ color: match.homeTeam.color }}
      >
        {match.homeTeam.shortName}
      </span>
      <span className="font-display text-4xl font-bold tabular-nums leading-none text-foreground">
        {match.homeScore}
      </span>
      <span className="font-display text-2xl font-light text-muted-foreground" aria-hidden="true">
        –
      </span>
      <span className="font-display text-4xl font-bold tabular-nums leading-none text-foreground">
        {match.awayScore}
      </span>
      <span
        className="max-w-[11ch] truncate text-2xl font-medium text-foreground"
        style={{ color: match.awayTeam.color }}
      >
        {match.awayTeam.shortName}
      </span>
      <TeamCrest team={match.awayTeam} size={72} />
      <span className="ml-2 whitespace-nowrap text-base text-muted-foreground">
        {new Date(match.date).toLocaleDateString("es-AR", {
          day: "numeric",
          month: "short",
        })}
      </span>
    </li>
  );
}

export function TickerBar() {
  const x = useMotionValue(0);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const { data: matches = [], isLoading, error } = useMatches();

  useAnimationFrame((_, delta) => {
    if (paused.current || reduceMotion) return;
    const track = trackRef.current;
    if (!track || track.scrollWidth <= 0) return;

    const half = track.scrollWidth / 2;
    let next = (x.get() - 0.045 * delta) % half;

    if (next <= -half) next = 0;
    x.set(next);
  });

  if (isLoading || error) return null;

  const results = matches
    .filter((match) => match.status === "finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
          <Radio className="size-3.5 text-gold" aria-hidden="true" />
          <span className="font-display text-xs font-semibold uppercase tracking-wide text-foreground">
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
            ref={trackRef}
            className="flex w-max items-center py-3.5"
            style={{ x }}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            onFocus={() => (paused.current = true)}
            onBlur={() => (paused.current = false)}
          >
            {items.map((match, index) => (
              <TickerItem key={`${match._id}-${index}`} match={match} />
            ))}
          </motion.ul>
        </div>
      </Container>
    </aside>
  );
}