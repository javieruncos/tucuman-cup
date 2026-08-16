"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { useMatches } from "@/hooks/useMatches";
import { useMatchStats } from "@/hooks/useMatchStats";
import type { MatchResponseType } from "@/types/matches";

function LivePulse() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-danger" />
    </span>
  );
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
    <div className="flex flex-col gap-1.5 pt-4 first:pt-0">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold tabular-nums text-foreground">{home}</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="font-semibold tabular-nums text-foreground">{away}</span>
      </div>
      <div className="flex h-1 gap-1 overflow-hidden">
        <div className="flex flex-1 justify-end overflow-hidden rounded-full bg-surface-3/60">
          <motion.div
            className="h-full rounded-full"
            style={{ background: homeColor }}
            initial={{ width: 0 }}
            animate={{ width: `${homePct}%` }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: "easeOut" }}
          />
        </div>
        <div className="flex flex-1 overflow-hidden rounded-full bg-surface-3/60">
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

  const played = match.status === "live" || match.status === "finished";
  const showStats = match.status !== "scheduled";

  return (
    <Section id="inicio" className="py-6 sm:py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-border/60"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/tribunas.jfif')]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
          </div>

          <div className="relative flex flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {/* Cabecera editorial */}
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-white/10 pb-6">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Tucumán Cup 2026
                </p>
                <h2 className="font-display mt-2 text-3xl font-semibold uppercase leading-tight tracking-wide text-balance sm:text-4xl lg:text-5xl">
                  Partido destacado
                </h2>
              </div>
              <MatchState status={match.status} />
            </div>

            {/* Scoreboard protagonista */}
            <div className="flex flex-col items-center pt-8 sm:pt-10">
              <div className="flex w-full items-center justify-center gap-4 sm:gap-10 lg:gap-14">
                <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center">
                  <TeamCrest team={match.homeTeam} size={72} className="sm:hidden" />
                  <TeamCrest team={match.homeTeam} size={128} className="hidden sm:inline-flex lg:hidden" />
                  <TeamCrest team={match.homeTeam} size={144} className="hidden lg:inline-flex" />
                  <div className="w-full">
                    <p className="font-display truncate text-lg font-bold uppercase leading-tight tracking-wide sm:text-2xl lg:text-4xl">
                      {match.homeTeam.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {match.homeTeam.city}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                  <span className="animate-score-pop font-display text-6xl font-bold leading-none tabular sm:text-8xl lg:text-9xl">
                    {played ? match.homeScore : "–"}
                  </span>
                  <span className="font-display text-3xl font-light text-muted-foreground sm:text-5xl" aria-hidden="true">
                    –
                  </span>
                  <span className="animate-score-pop font-display text-6xl font-bold leading-none tabular sm:text-8xl lg:text-9xl">
                    {played ? match.awayScore : "–"}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center">
                  <TeamCrest team={match.awayTeam} size={72} className="sm:hidden" />
                  <TeamCrest team={match.awayTeam} size={128} className="hidden sm:inline-flex lg:hidden" />
                  <TeamCrest team={match.awayTeam} size={144} className="hidden lg:inline-flex" />
                  <div className="w-full">
                    <p className="font-display truncate text-lg font-bold uppercase leading-tight tracking-wide sm:text-2xl lg:text-4xl">
                      {match.awayTeam.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {match.awayTeam.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info básica */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
                  {new Date(match.date).toLocaleDateString("es-AR")}
                </span>
                <span className="size-1 rounded-full bg-border" aria-hidden="true" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
                  {match.time} hs
                </span>
                <span className="size-1 rounded-full bg-border" aria-hidden="true" />
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
                  {match.homeTeam.city}
                </span>
              </div>
            </div>

            {/* Estadísticas secundarias */}
            {showStats && (
              <div className="border-t border-white/10 pt-6 lg:mx-auto lg:max-w-2xl lg:pt-7">
                <h3 className="sr-only">Estadísticas del partido</h3>
                {isStatsLoading ? (
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex flex-col gap-1.5 pt-4 first:pt-0">
                        <div className="flex items-center justify-between">
                          <span className="h-3 w-6 animate-pulse rounded bg-white/15" />
                          <span className="h-3 w-16 animate-pulse rounded bg-white/15" />
                          <span className="h-3 w-6 animate-pulse rounded bg-white/15" />
                        </div>
                        <div className="h-1 animate-pulse rounded-full bg-white/15" />
                      </div>
                    ))}
                  </div>
                ) : isStatsError ? (
                  <p className="text-xs text-muted-foreground">
                    No se pudieron cargar las estadísticas.
                  </p>
                ) : stats ? (
                  <div className="flex flex-col divide-y divide-white/10">
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

            {/* CTA */}
            <div className="mt-8 flex justify-center border-t border-white/10 pt-6 sm:mt-9">
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
        </motion.div>
      </Container>
    </Section>
  );
}