"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TournamentIdentity } from "@/components/tournament/TournamentIdentity";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { useMatches } from "@/hooks/useMatches";
import { useStandings } from "@/hooks/useStandings";
import { cn } from "@/lib/utils";
import type { MatchResponseType } from "@/types/matches";

type MatchDay = {
  key: string;
  label: string;
  matches: MatchResponseType[];
};

const WEEKDAY_SHORT = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const MONTH_SHORT = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];

function formatDayLabel(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return `${WEEKDAY_SHORT[date.getDay()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )} ${MONTH_SHORT[date.getMonth()]}`;
}

function dayKey(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function groupByDay(
  list: MatchResponseType[],
  direction: "asc" | "desc"
): MatchDay[] {
  const byDay = new Map<string, MatchResponseType[]>();

  for (const match of list) {
    const key = dayKey(match.date);
    const bucket = byDay.get(key) ?? [];
    bucket.push(match);
    byDay.set(key, bucket);
  }

  const groups = Array.from(byDay.entries()).map(([key, bucket]) => ({
    key,
    label: formatDayLabel(bucket[0].date),
    matches: bucket.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  }));

  groups.sort((a, b) =>
    direction === "asc"
      ? a.key.localeCompare(b.key)
      : b.key.localeCompare(a.key)
  );

  return groups;
}

function FixturesMessage({
  children,
  onRetry,
}: {
  children: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="font-display mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Reintentar
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function SubHeading({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </h2>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}

function formatGoalDifference(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

function TournamentStatus({ round }: { round?: string }) {
  const {
    data: standings = [],
    isLoading,
    isFetching,
    error,
  } = useStandings();
  const loading = isLoading || (isFetching && standings.length === 0);

  const matchesPlayed =
    standings.length > 0
      ? Math.round(standings.reduce((sum, row) => sum + row.played, 0) / 2)
      : null;
  const leader = standings.find((row) => row.position === 1);

  if (!round && matchesPlayed === null && !leader) {
    return null;
  }

  return (
    <section
      aria-labelledby="tournament-status"
      className="border-y border-border/40 bg-surface-1"
    >
      <div className="px-4 py-5 sm:px-6">
        <p
          id="tournament-status"
          className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Estado del torneo
        </p>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-10 gap-y-3">
          {round && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Jornada actual
              </p>
              <p className="font-display mt-0.5 text-2xl font-bold uppercase tracking-wide text-gold sm:text-3xl">
                {round}
              </p>
            </div>
          )}

          {loading ? (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Partidos disputados
              </p>
              <Skeleton className="mt-2 h-8 w-24" />
            </div>
          ) : matchesPlayed !== null ? (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Partidos disputados
              </p>
              <p className="tabular font-display mt-0.5 text-xl font-bold text-gold sm:text-2xl">
                {matchesPlayed}
              </p>
            </div>
          ) : null}
        </div>

        {!loading && leader && !error && (
          <p className="mt-3 text-xs font-medium text-muted-foreground sm:text-sm">
            <span className="font-display font-semibold uppercase tracking-wide text-foreground">
              {leader.team.name}
            </span>{" "}
            lidera con{" "}
            <span className="tabular-nums text-gold">{leader.points} pts</span>
          </p>
        )}
      </div>
    </section>
  );
}

function TournamentStatusSkeleton() {
  return (
    <div className="border-y border-border/40 bg-surface-1 px-4 py-5 sm:px-6">
      <Skeleton className="h-3 w-28" />
      <div className="mt-3 flex flex-wrap items-baseline gap-x-10 gap-y-3">
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-8 w-20" />
        </div>
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-7 w-20" />
        </div>
      </div>
    </div>
  );
}

function MatchRow({ match }: { match: MatchResponseType }) {
  const { homeTeam, awayTeam, time, status, homeScore, awayScore, venue } =
    match;

  const isLive = status === "live";
  const isFinished = status === "finished";

  return (
    <li>
      <Link
        href={`/matches/${match._id}`}
        className="group flex flex-col transition-colors hover:bg-surface-1/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center justify-end gap-2.5 text-right">
            <span className="font-display min-w-0 truncate text-sm font-semibold uppercase tracking-wide text-foreground sm:text-base">
              {homeTeam.name}
            </span>
            <TeamCrest team={homeTeam} size={36} />
          </div>

          <div className="flex w-[76px] shrink-0 flex-col items-center sm:w-[84px]">
            {isFinished ? (
              <span className="font-display text-xl font-bold tabular-nums text-gold sm:text-2xl">
                {homeScore}–{awayScore}
              </span>
            ) : isLive ? (
              <span className="font-display text-xl font-bold tabular-nums text-live sm:text-2xl">
                {homeScore}–{awayScore}
              </span>
            ) : (
              <span className="font-display text-xl font-bold tabular-nums text-foreground sm:text-2xl">
                {time}
              </span>
            )}
            <span className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]">
              {isLive ? (
                <>
                  <span
                    className="animate-live-pulse size-1.5 rounded-full bg-live"
                    aria-hidden="true"
                  />
                  <span className="text-live">En vivo</span>
                </>
              ) : isFinished ? (
                <span className="text-muted-foreground">Finalizado</span>
              ) : (
                <span className="text-gold">Próximo</span>
              )}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2.5">
            <TeamCrest team={awayTeam} size={36} />
            <span className="font-display min-w-0 truncate text-sm font-semibold uppercase tracking-wide text-foreground sm:text-base">
              {awayTeam.name}
            </span>
          </div>
        </div>

        {venue && (
          <p className="flex items-center justify-center gap-1.5 px-4 pb-3 text-[11px] font-medium tracking-wide text-muted-foreground sm:px-6">
            <MapPin className="size-3 shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate">{venue}</span>
          </p>
        )}
      </Link>
    </li>
  );
}

function DaySection({ day }: { day: MatchDay }) {
  // El round se muestra en la banda solo si todos los partidos del día
  // comparten una misma jornada. Si un día tiene varios rounds (o documentos
  // sin round), se cae al label de día para no mostrar una fecha incorrecta.
  const rounds = Array.from(
    new Set(
      day.matches
        .map((match) => match.round)
        .filter((round): round is string => Boolean(round?.trim()))
    )
  );
  const round = rounds.length === 1 ? rounds[0] : undefined;

  return (
    <section aria-labelledby={`day-${day.key}`}>
      <div className="flex items-baseline justify-between gap-4 bg-surface-1 px-4 py-3 sm:px-6">
        <h3
          id={`day-${day.key}`}
          className="font-display text-base font-bold uppercase tracking-wide text-gold sm:text-lg"
        >
          {round ? (
            <>
              <span>{round}</span>
              <span className="mx-2 text-[11px] font-medium text-muted-foreground/60">
                ·
              </span>
              {day.label}
            </>
          ) : (
            day.label
          )}
        </h3>
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {day.matches.length}{" "}
          {day.matches.length === 1 ? "partido" : "partidos"}
        </span>
      </div>
      <ul className="divide-y divide-border">
        {day.matches.map((match) => (
          <MatchRow key={match._id} match={match} />
        ))}
      </ul>
    </section>
  );
}

function DayGroups({
  groups,
  empty = "No hay partidos aquí.",
}: {
  groups: MatchDay[];
  empty?: string;
}) {
  const matches = groups.flatMap((group) => group.matches);

  if (matches.length === 0) {
    return <FixturesMessage>{empty}</FixturesMessage>;
  }

  return (
    <div className="flex flex-col gap-8">
      {groups.map((day) => (
        <DaySection key={day.key} day={day} />
      ))}
    </div>
  );
}

function StandingsMini() {
  const {
    data: standings = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useStandings();
  const loading = isLoading || (isFetching && standings.length === 0);

  return (
    <section aria-labelledby="standings-mini">
      <div className="flex items-center gap-3">
        <h2
          id="standings-mini"
          className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Tabla de posiciones
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="mt-4 bg-surface-1">
        {loading ? (
          <StandingsSkeleton />
        ) : error ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No se pudo cargar la tabla.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="font-display mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Reintentar
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : standings.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            La tabla aún no tiene datos.
          </p>
        ) : (
          <ul className="divide-y divide-border/60">
            {standings.slice(0, 4).map((row) => {
              const isLeader = row.position === 1;

              return (
                <li key={row._id} className="relative">
                  {isLeader && (
                    <span
                      className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    href={`/teams/${row.team._id}`}
                    className="flex items-center gap-2.5 px-5 py-3 transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "font-mono w-6 tabular-nums text-xs font-medium",
                        isLeader ? "text-gold" : "text-muted-foreground"
                      )}
                    >
                      {String(row.position).padStart(2, "0")}
                    </span>
                    <TeamCrest team={row.team} size={24} />
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm font-medium",
                        isLeader ? "text-gold" : "text-foreground"
                      )}
                    >
                      {row.team.name}
                    </span>
                    <span className="tabular-nums text-xs text-muted-foreground">
                      {row.played}
                    </span>
                    <span className="tabular-nums text-xs text-muted-foreground">
                      {formatGoalDifference(row.goalDifference)}
                    </span>
                    <span className="tabular font-display w-7 text-right font-bold text-gold">
                      {row.points}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {!loading && !error && standings.length > 0 && (
          <Link
            href="/standings"
            className="flex items-center justify-center gap-1 border-t border-border/60 px-5 py-3 text-xs font-medium text-primary transition-colors hover:text-primary-300"
          >
            Ver tabla completa
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}

function AgendaSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index}>
          <div className="flex items-center justify-between gap-4 bg-surface-1 px-4 py-3 sm:px-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: index === 0 ? 3 : 2 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6"
              >
                <div className="flex items-center justify-end gap-2.5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="size-9 rounded-full" />
                </div>
                <Skeleton className="h-7 w-12" />
                <div className="flex items-center gap-2.5">
                  <Skeleton className="size-9 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StandingsSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5 px-5 py-3 [&+div]:border-t [&+div]:border-border/60"
        >
          <Skeleton className="h-4 w-6" />
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-5" />
        </div>
      ))}
    </div>
  );
}

export default function FixturesPage() {
  const {
    data: matches = [],
    isLoading,
    error,
    refetch,
  } = useMatches();

  const live = matches.filter((match) => match.status === "live");
  const upcoming = matches
    .filter((match) => match.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const finished = matches.filter((match) => match.status === "finished");

  const liveGroups = groupByDay(live, "asc");
  const upcomingGroups = groupByDay(upcoming, "asc");
  const resultsGroups = groupByDay(finished, "desc");

  // Jornada actual: un único round compartido por los partidos en juego o
  // próximos. Si hay rounds mixtos o no hay partidos activos, no se muestra
  // (mismo criterio seguro que la banda de día).
  const activeRounds = Array.from(
    new Set(
      matches
        .filter(
          (match) =>
            match.status === "live" || match.status === "scheduled"
        )
        .map((match) => match.round)
        .filter((round): round is string => Boolean(round?.trim()))
    )
  );
  const currentRound = activeRounds.length === 1 ? activeRounds[0] : undefined;

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          compact
          eyebrow="Calendario"
          title="Fixture y Resultados"
          description="Todos los partidos de la Tucumán Cup, los próximos y el historial completo de resultados de la temporada."
          image="/images/resultados.jfif"
        >
          <TournamentIdentity />
        </PageHero>
        <Container className="py-10">
          {isLoading ? (
            <TournamentStatusSkeleton />
          ) : error ? null : (
            <TournamentStatus round={currentRound} />
          )}

          <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
            {isLoading ? (
              <AgendaSkeleton />
            ) : error ? (
              <FixturesMessage onRetry={() => refetch()}>
                No se pudieron cargar los partidos.
              </FixturesMessage>
            ) : (
              <Tabs
                variant="editorial"
                tabs={[
                  {
                    id: "all",
                    label: (
                      <>
                        Todos
                        <span className="hidden sm:inline"> ({matches.length})</span>
                      </>
                    ),
                    content: (
                      <>
                        {liveGroups.length > 0 && (
                          <div className="mb-8">
                            <SubHeading label="En juego" />
                            <DayGroups groups={liveGroups} />
                          </div>
                        )}
                        {upcomingGroups.length > 0 && (
                          <div className="mb-8">
                            <SubHeading label="Próximos partidos" />
                            <DayGroups
                              groups={upcomingGroups}
                              empty="No hay partidos próximos."
                            />
                          </div>
                        )}
                        {resultsGroups.length > 0 && (
                          <>
                            <SubHeading label="Resultados" />
                            <DayGroups
                              groups={resultsGroups}
                              empty="No hay resultados todavía."
                            />
                          </>
                        )}
                        {liveGroups.length === 0 &&
                          upcomingGroups.length === 0 &&
                          resultsGroups.length === 0 && (
                            <FixturesMessage>
                              No hay partidos cargados todavía.
                            </FixturesMessage>
                          )}
                      </>
                    ),
                  },
                  {
                    id: "live",
                    label: (
                      <>
                        En vivo
                        <span className="hidden sm:inline"> ({live.length})</span>
                      </>
                    ),
                    content: (
                      <DayGroups
                        groups={liveGroups}
                        empty="No hay partidos en vivo."
                      />
                    ),
                  },
                  {
                    id: "upcoming",
                    label: (
                      <>
                        Próximos
                        <span className="hidden sm:inline"> ({upcoming.length})</span>
                      </>
                    ),
                    content: (
                      <DayGroups
                        groups={upcomingGroups}
                        empty="No hay partidos próximos."
                      />
                    ),
                  },
                  {
                    id: "results",
                    label: (
                      <>
                        Resultados
                        <span className="hidden sm:inline"> ({finished.length})</span>
                      </>
                    ),
                    content: (
                      <DayGroups
                        groups={resultsGroups}
                        empty="No hay resultados todavía."
                      />
                    ),
                  },
                ]}
              />
            )}

            <aside className="mt-10 lg:sticky lg:top-24 lg:mt-0">
              <StandingsMini />
            </aside>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <SubHeading label="El torneo" />
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
              aria-label="Más del torneo"
            >
              <Link
                href="/stats"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Goleadores
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/teams"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Equipos
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/standings"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Tabla completa
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </nav>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}