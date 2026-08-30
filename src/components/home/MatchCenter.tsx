"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { useMatches } from "@/hooks/useMatches";
import { useMatchStats } from "@/hooks/useMatchStats";
import { useTournament } from "@/hooks/useTournament";
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

function TeamStack({ team }: { team: Team }) {
  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-2 text-center sm:gap-2.5">
      <div className="flex h-[60px] w-full items-center justify-center sm:h-[80px] lg:h-[96px]">
        <TeamCrest team={team} size={60} className="sm:hidden" />
        <TeamCrest team={team} size={80} className="hidden sm:inline-flex lg:hidden" />
        <TeamCrest team={team} size={96} className="hidden lg:inline-flex" />
      </div>
      <div className="flex min-h-[2.5rem] w-full items-start justify-center sm:min-h-[2.75rem]">
        <p className="font-display text-sm font-bold uppercase leading-tight tracking-wide text-foreground sm:text-base lg:text-lg">
          {team.name}
        </p>
      </div>
    </div>
  );
}

function Score({ match }: { match: MatchResponseType }) {
  const played = match.status === "live" || match.status === "finished";

  if (!played) {
    return (
      <span className="font-display text-lg font-semibold uppercase tracking-[0.35em] text-muted-foreground sm:text-xl">
        VS
      </span>
    );
  }

  return (
    <div className="flex items-baseline gap-5 whitespace-nowrap text-gold sm:gap-7 lg:gap-8">
      <span className="animate-score-pop font-display text-5xl font-bold leading-none tabular sm:text-6xl lg:text-7xl">
        {match.homeScore}
      </span>
      <span className="animate-score-pop font-display text-5xl font-bold leading-none tabular sm:text-6xl lg:text-7xl">
        {match.awayScore}
      </span>
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
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <span className="font-display text-sm font-semibold tabular text-foreground sm:text-base">
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
        <span className="font-display text-sm font-semibold tabular text-foreground sm:text-base">
          {away}
        </span>
      </div>
    </div>
  );
}

export function MatchCenter() {
  const { data: matches, isLoading, error } = useMatches();
  const { data: tournament } = useTournament();
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

  if (error) {
    return null;
  }

  if (!match) {
    return null;
  }

  const showStats = match.status !== "scheduled";

  return (
    <Section id="inicio" className="py-5 sm:py-7">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative border-y border-border/40 bg-surface-1"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-y-0 left-0 w-[55%] opacity-[0.05] sm:opacity-[0.08]"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 8% 20%, ${match.homeTeam.color} 0%, transparent 62%)`,
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-[55%] opacity-[0.05] sm:opacity-[0.08]"
              style={{
                background: `radial-gradient(ellipse 120% 100% at 92% 20%, ${match.awayTeam.color} 0%, transparent 62%)`,
              }}
            />
          </div>
          <div className="relative px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-6">
            <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr]">
              {/* Columna editorial */}
              <div className="order-1 flex flex-col justify-center text-center lg:col-start-1 lg:row-start-1 lg:pr-9 lg:text-left">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
                  {tournament ? `${tournament.name} · ${tournament.season}` : "Tucumán Cup"}
                </p>
                <h2 className="font-display mt-2 text-xl font-semibold uppercase leading-tight tracking-wide sm:text-2xl">
                  Partido destacado
                </h2>
                <div className="mt-3">
                  <MatchState status={match.status} />
                </div>
              </div>

              {/* Enfrentamiento */}
              <div className="order-2 flex flex-col border-b border-border/40 pb-4 pt-4 sm:pb-5 sm:pt-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-b-0 lg:border-l lg:pb-0 lg:pl-9 lg:pt-0 lg:self-center">
                <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-8 lg:gap-x-12">
                  <TeamStack team={match.homeTeam} />
                  <Score match={match} />
                  <TeamStack team={match.awayTeam} />
                </div>
              </div>

              {/* Meta */}
              <div className="order-3 mt-4 flex flex-col justify-center text-center lg:col-start-1 lg:row-span-1 lg:row-start-2 lg:mt-0 lg:pr-9 lg:text-left">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {formatMatchDate(match.date)} ·{" "}
                  <span className="text-gold">{match.time} HS</span>
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {match.homeTeam.city.toUpperCase()}
                </p>
              </div>

              {/* CTA */}
              <div className="order-4 mt-5 flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:pl-9 lg:self-end">
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

            {/* Estadísticas */}
            {showStats && (
              <div className="mt-4 border-t border-border/40 pt-4 text-center sm:mt-5 sm:pt-5 sm:text-left">
                <h3 className="sr-only">Estadísticas del partido</h3>
                {isStatsLoading ? (
                  <div className="grid gap-5 sm:grid-cols-3 sm:gap-8 lg:gap-10">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex flex-col gap-1.5">
                        <span className="h-2.5 w-14 animate-pulse rounded bg-white/15" />
                        <div className="flex items-center gap-3">
                          <span className="h-3.5 w-5 animate-pulse rounded bg-white/15" />
                          <span className="h-0.5 flex-1 animate-pulse bg-white/15" />
                          <span className="h-3.5 w-5 animate-pulse rounded bg-white/15" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isStatsError ? (
                  <p className="text-xs text-muted-foreground">
                    No se pudieron cargar las estadísticas.
                  </p>
                ) : stats ? (
                  <div className="grid gap-5 sm:grid-cols-3 sm:gap-8 lg:gap-10">
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
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}