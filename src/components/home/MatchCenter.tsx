"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { useMatches } from "@/hooks/useMatches";
import { useMatchStats } from "@/hooks/useMatchStats";
import { cn } from "@/lib/utils";
import type { MatchResponseType } from "@/types/matches";
import type { Team } from "@/types/teams";

function LivePulse() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-danger" />
    </span>
  );
}

function formatMatchDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
    .format(date)
    .replace(/\./g, "")
    .toUpperCase();
}

function MatchState({ status }: { status: MatchResponseType["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-danger">
        <LivePulse />
        En vivo
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Finalizado
      </span>
    );
  }
  return (
    <span className="text-xs font-bold uppercase tracking-widest text-gold">
      Próximo
    </span>
  );
}

function TeamSide({ team, side }: { team: Team; side: "home" | "away" }) {
  const isHome = side === "home";

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-6",
        isHome ? "justify-start text-left" : "justify-end text-right"
      )}
    >
      {isHome ? (
        <>
          <div className="shrink-0">
            <TeamCrest team={team} size={96} className="lg:hidden" />
            <TeamCrest team={team} size={160} className="hidden lg:inline-flex" />
          </div>
          <p className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-foreground md:text-3xl lg:text-4xl xl:text-5xl">
            {team.name}
          </p>
        </>
      ) : (
        <>
          <p className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-foreground md:text-3xl lg:text-4xl xl:text-5xl">
            {team.name}
          </p>
          <div className="shrink-0">
            <TeamCrest team={team} size={96} className="lg:hidden" />
            <TeamCrest team={team} size={160} className="hidden lg:inline-flex" />
          </div>
        </>
      )}
    </div>
  );
}

function MobileComposition({ match }: { match: MatchResponseType }) {
  const played = match.status === "live" || match.status === "finished";

  return (
    <div className="sm:hidden">
      <div className="grid grid-cols-2 items-start gap-x-4 gap-y-8">
        <div className="flex min-w-0 flex-col items-center gap-3 text-center">
          <p className="font-display text-base font-bold uppercase leading-tight tracking-wide text-foreground">
            {match.homeTeam.name}
          </p>
          <TeamCrest team={match.homeTeam} size={64} />
        </div>
        <div className="flex min-w-0 flex-col items-center gap-3 text-center">
          <p className="font-display text-base font-bold uppercase leading-tight tracking-wide text-foreground">
            {match.awayTeam.name}
          </p>
          <TeamCrest team={match.awayTeam} size={64} />
        </div>
      </div>

      <div className="mt-7 flex justify-center">
        {played ? (
          <div className="flex items-center gap-6 whitespace-nowrap text-gold">
            <span className="animate-score-pop font-display text-6xl font-bold leading-none tabular text-gold">
              {match.homeScore}
            </span>
            <span className="animate-score-pop font-display text-6xl font-bold leading-none tabular text-gold">
              {match.awayScore}
            </span>
          </div>
        ) : (
          <span className="font-display text-sm font-light tracking-[0.3em] text-muted-foreground/60">
            VS
          </span>
        )}
      </div>
    </div>
  );
}

function HorizontalComposition({ match }: { match: MatchResponseType }) {
  const played = match.status === "live" || match.status === "finished";

  return (
    <div className="hidden sm:block">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 md:gap-x-16 lg:gap-x-24">
        <TeamSide team={match.homeTeam} side="home" />

        <div className="flex min-w-0 justify-center">
          {played ? (
            <div className="flex items-center gap-7 whitespace-nowrap text-gold md:gap-9 lg:gap-10">
              <span className="animate-score-pop font-display text-7xl font-bold leading-none tabular text-gold md:text-8xl xl:text-9xl">
                {match.homeScore}
              </span>
              <span className="animate-score-pop font-display text-7xl font-bold leading-none tabular text-gold md:text-8xl xl:text-9xl">
                {match.awayScore}
              </span>
            </div>
          ) : (
            <span className="font-display text-xl font-light tracking-[0.3em] text-muted-foreground/60 lg:text-2xl">
              VS
            </span>
          )}
        </div>

        <TeamSide team={match.awayTeam} side="away" />
      </div>
    </div>
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
  stats: [number, number];
  homeColor: string;
  awayColor: string;
  index: number;
}) {
  const [home, away] = stats;
  const total = home + away;
  const homePct = total === 0 ? 50 : Math.round((home / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <span className="font-display text-base font-semibold tabular text-foreground sm:text-lg">
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
        <span className="font-display text-base font-semibold tabular text-foreground sm:text-lg">
          {away}
        </span>
      </div>
    </div>
  );
}

export function MatchCenter() {
  const { data: matches, isLoading, isError } = useMatches();
  const match =
    matches?.find((item) => item.status === "live") ??
    matches?.find((item) => item.status === "scheduled");
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

  const showStats = match.status !== "scheduled";

  return (
    <Section id="inicio" className="py-6 sm:py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden bg-surface-1"
        >
          <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {/* Franja de estado */}
            <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-4 sm:pb-5">
              <MatchState status={match.status} />
              <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
                Tucumán Cup · 2026 · 5ª fecha
              </p>
            </div>

            {/* Enfrentamiento */}
            <div className="py-10 sm:py-14 lg:py-16">
              <MobileComposition match={match} />
              <HorizontalComposition match={match} />
            </div>

            {/* Fecha · hora · escenario */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border/40 pt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:pt-5">
              <span>
                {formatMatchDate(match.date)} ·{" "}
                <span className="text-gold">{match.time} HS</span>
                {" · "}
                {match.homeTeam.city.toUpperCase()}
              </span>
            </div>

            {/* Estadísticas + CTA */}
            <div className="mt-6 flex flex-col gap-6 border-t border-border/40 pt-5 sm:mt-8 sm:pt-6 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:pt-7">
              {showStats && (
                <div className="flex-1">
                  <h3 className="sr-only">Estadísticas del partido</h3>
                  {isStatsLoading ? (
                    <div className="grid gap-6 sm:grid-cols-3 sm:gap-8 lg:gap-12">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <span className="h-3 w-16 animate-pulse rounded bg-white/15" />
                          <div className="flex items-center gap-3">
                            <span className="h-4 w-6 animate-pulse rounded bg-white/15" />
                            <span className="h-0.5 flex-1 animate-pulse bg-white/15" />
                            <span className="h-4 w-6 animate-pulse rounded bg-white/15" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : isStatsError ? (
                    <p className="text-xs text-muted-foreground">
                      No se pudieron cargar las estadísticas.
                    </p>
                  ) : stats ? (
                    <div className="grid gap-6 sm:grid-cols-3 sm:gap-8 lg:gap-12">
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
              )}

              <div className={cn("flex", showStats ? "justify-end" : "justify-center")}>
                <Link
                  href={`/matches/${match._id}`}
                  className="group inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:text-foreground"
                >
                  Ver cobertura completa
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}