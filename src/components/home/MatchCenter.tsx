"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Goal,
  MapPin,
  Square,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamCrest } from "@/components/shared/TeamCrest";
import {
  featuredMatch,
  type Match,
  type MatchStats,
} from "@/lib/mock/portal";
import { cn } from "@/lib/utils";
import { useMatches } from "@/hooks/useMatches";
import { useMatchStats } from "@/hooks/useMatchStats";
import { MatchResponseType } from "@/types/matches";

function LivePulse() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-danger" />
    </span>
  );
}





function StatSplit({
  label,
  stats,
  homeColor,
  awayColor,
  index,
}: {
  label: string;
  stats: MatchStats[keyof MatchStats];
  homeColor: string;
  awayColor: string;
  index: number;
}) {
  const [home, away] = stats;
  const total = home + away;
  const homePct = Math.round((home / total) * 100);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold tabular-nums text-foreground">
          {home}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="font-semibold tabular-nums text-foreground">
          {away}
        </span>
      </div>
      <div className="flex h-1 gap-1 overflow-hidden">
        <div className="flex flex-1 justify-end overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full rounded-full"
            style={{ background: homeColor }}
            initial={{ width: 0 }}
            animate={{ width: `${homePct}%` }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: "easeOut" }}
          />
        </div>
        <div className="flex flex-1 overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full rounded-full opacity-70"
            style={{ background: awayColor }}
            initial={{ width: 0 }}
            animate={{ width: `${100 - homePct}%` }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function EventsTimeline() {
  return (
    <p className="py-4 text-center text-xs text-muted-foreground">
      No hay eventos disponibles.
    </p>
  );
}


const facts = (match: MatchResponseType) => [
  {
    label: "Fecha",
    value: new Date(match.date).toLocaleDateString("es-AR"),
    icon: CalendarDays,
  },
  {
    label: "Hora",
    value: `${match.time} hs`,
    icon: Clock,
  },
  {
    label: "Ciudad",
    value: match.homeTeam.city,
    icon: MapPin,
  },
];
export function MatchCenter() {
  const { data: matches, isLoading, isError } = useMatches();
  const match =
  matches?.find((match) => match.status === "live") ??
  matches?.find((match) => match.status === "scheduled");
  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useMatchStats(match?._id ?? "");

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  if (!match) {
    return null;
  }

  return (
    <Section id="inicio" className="py-6 sm:py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_80px_160px_-80px_rgba(0,0,0,0.9)]"
        >
          <div className="stadium-glow field-lines absolute inset-0" aria-hidden />
          <div className="relative grid lg:grid-cols-[minmax(0,340px)_1fr]">
            {/* Columna editorial */}
            <div className="flex flex-col gap-6 border-b border-border/50 bg-elevated/30 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:bg-elevated/40">
              <div className="flex items-center gap-2">
                <span className="rounded bg-gold px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
                  Match Center
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-danger/40 bg-danger/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-danger">
                  <LivePulse />
                  En vivo
                </span>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Tucumán Cup 2026 · {match.date}
                </p>
                <h2 className="font-display mt-1 text-3xl font-semibold uppercase leading-tight tracking-wide text-balance">
                  {match.homeTeam.name} <span className="text-gold">vs</span>{" "}
                  {match.awayTeam.name}
                </h2>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {match.homeTeam.name} y {match.awayTeam.name} se cruzan en {match.homeTeam.city} en un
                  partido decisivo.
                </p>
              </div>

              <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
                {facts(match).map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-center gap-3 bg-card px-4 py-3"
                  >
                    <fact.icon className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    <dt className="w-16 text-xs uppercase tracking-wide text-muted-foreground sm:w-20">
                      {fact.label}
                    </dt>
                    <dd className="ml-auto text-right text-sm font-medium">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>



              <a
                href="#partidos"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
              >
                Abrir centro de partido <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>

            {/* Scoreboard */}
            <div className="relative flex flex-col">
              <div className="flex items-center justify-between px-6 pt-6 text-[11px] font-semibold uppercase tracking-widest sm:px-8 sm:pt-8">
                <span className="inline-flex items-center gap-2 text-danger">
                  <LivePulse />
                  Transmisión en vivo
                </span>
                <span className="text-muted-foreground uppercase">
                  {match.status === "live" ? "En vivo" : match.status}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-8 sm:gap-8 sm:px-8 sm:py-10">
                <div className="flex flex-col items-center gap-3 text-center">
                  <TeamCrest team={match.homeTeam} size={64} className="sm:hidden" />
                  <TeamCrest team={match.homeTeam} size={112} className="hidden sm:inline-flex lg:hidden" />
                  <TeamCrest team={match.homeTeam} size={128} className="hidden lg:inline-flex" />
                  <div>
                    <p className="font-display text-base font-semibold uppercase leading-tight tracking-wide sm:text-xl">
                      {match.homeTeam.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {match.homeTeam.city}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    <span className="animate-score-pop font-display text-5xl font-bold leading-none tabular sm:text-7xl lg:text-8xl">
                      {match.homeScore}
                    </span>
                    <span className="font-display text-3xl font-light text-muted-foreground sm:text-4xl">
                      :
                    </span>
                    <span className="animate-score-pop font-display text-5xl font-bold leading-none tabular sm:text-7xl lg:text-8xl">
                      {match.awayScore}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-3 py-1 text-sm font-semibold text-live">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-3 py-1 text-sm font-semibold text-live">
                      <span
                        className="size-1.5 animate-live-pulse rounded-full bg-live"
                        aria-hidden="true"
                      />
                      {match.homeTeam.city}
                    </span>

                  </div>

                </div>

                <div className="flex flex-col items-center gap-3 text-center">
                  <TeamCrest team={match.awayTeam} size={64} className="sm:hidden" />
                  <TeamCrest team={match.awayTeam} size={112} className="hidden sm:inline-flex lg:hidden" />
                  <TeamCrest team={match.awayTeam} size={128} className="hidden lg:inline-flex" />
                  <div>
                    <p className="font-display text-base font-semibold uppercase leading-tight tracking-wide sm:text-xl">
                      {match.awayTeam.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {match.awayTeam.city}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2">
                <div className="bg-card p-6">
                  <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Línea de tiempo
                  </h3>
                  <EventsTimeline />
                </div>
                <div className="bg-card p-6">
                  <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Estadísticas
                  </h3>
                  {isStatsLoading ? (
                    <div className="flex flex-col gap-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <span className="h-3 w-6 animate-pulse rounded bg-muted" />
                            <span className="h-3 w-16 animate-pulse rounded bg-muted" />
                            <span className="h-3 w-6 animate-pulse rounded bg-muted" />
                          </div>

                          <div className="h-1 animate-pulse rounded-full bg-muted" />
                        </div>
                      ))}
                    </div>
                  ) : isStatsError ? (
                    <p className="text-xs text-muted-foreground">
                      No se pudieron cargar las estadísticas.
                    </p>
                  ) : stats ? (
                    <div className="flex flex-col gap-4">
                      <StatSplit
                        label="Posesión"
                        stats={[stats.home.possession, stats.away.possession]}
                        homeColor={match.homeTeam.color}
                        awayColor={match.awayTeam.color}
                        index={0}
                      />

                      <StatSplit
                        label="Remates"
                        stats={[stats.home.shots, stats.away.shots]}
                        homeColor={match.homeTeam.color}
                        awayColor={match.awayTeam.color}
                        index={1}
                      />

                      <StatSplit
                        label="Al arco"
                        stats={[stats.home.shotsOnTarget, stats.away.shotsOnTarget]}
                        homeColor={match.homeTeam.color}
                        awayColor={match.awayTeam.color}
                        index={2}
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No hay estadísticas disponibles.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
