"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchCard } from "@/components/matches/MatchCard";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { useMatches } from "@/hooks/useMatches";
import { useStandings } from "@/hooks/useStandings";
import type { MatchResponseType } from "@/types/matches";

type MatchDay = {
  key: string;
  label: string;
  matches: MatchResponseType[];
};

function formatDayLabel(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function formatFixtureDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  })
    .format(date)
    .replace(/\.$/, "");
}

function dayKey(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toISOString().slice(0, 10);
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

function FixturesMessage({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {matches.map((match) => (
        <MatchCard
          key={match._id}
          match={match}
          href={`/matches/${match._id}`}
        />
      ))}
    </div>
  );
}

function SummaryTiles({
  total,
  finished,
  upcoming,
  goals,
}: {
  total: number;
  finished: number;
  upcoming: number;
  goals: number;
}) {
  const tiles: Array<[string, number]> = [
    ["Partidos", total],
    ["Finalizados", finished],
    ["Próximos", upcoming],
    ["Goles", goals],
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {tiles.map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card px-5 py-4"
        >
          <p className="tabular font-display text-3xl font-bold text-gold">
            {value}
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

function NextMatch({ match }: { match?: MatchResponseType }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Próximo partido
        </p>
        {match && (
          <p className="font-mono text-xs font-medium uppercase tracking-wider tabular-nums text-muted-foreground">
            {formatFixtureDate(match.date)} · {match.time}
          </p>
        )}
      </div>

      {match ? (
        <Link
          href={`/matches/${match._id}`}
          className="group block transition-colors hover:bg-elevated"
        >
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-5">
            <div className="flex min-w-0 flex-col items-center gap-2">
              <TeamCrest team={match.homeTeam} size="xl" />
              <p className="w-full truncate text-center font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                {match.homeTeam.name}
              </p>
            </div>
            <div className="font-display text-xl font-bold text-gold sm:text-2xl">
              VS
            </div>
            <div className="flex min-w-0 flex-col items-center gap-2">
              <TeamCrest team={match.awayTeam} size="xl" />
              <p className="w-full truncate text-center font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                {match.awayTeam.name}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 border-t border-border/60 px-5 py-2.5 text-xs font-medium text-primary transition-colors group-hover:text-primary-300">
            Ver partido
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </div>
        </Link>
      ) : (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-muted-foreground">Sin partidos próximos.</p>
        </div>
      )}
    </div>
  );
}

function StandingsMini() {
  const {
    data: standings = [],
    isLoading,
    isFetching,
    error,
  } = useStandings();
  const loading = isLoading || (isFetching && standings.length === 0);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border/60 px-5 py-3">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Tabla
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-5 py-2.5 [&+div]:border-t [&+div]:border-border/60"
            >
              <Skeleton className="h-4 w-6" />
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-4 w-5" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">
          No se pudo cargar la tabla.
        </p>
      ) : standings.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">
          La tabla aún no tiene datos.
        </p>
      ) : (
        <div className="flex flex-col">
          {standings.slice(0, 4).map((row) => (
            <a
              key={row._id}
              href={`/teams/${row.team._id}`}
              className="flex items-center gap-2.5 px-5 py-2.5 transition-colors hover:bg-elevated [&+a]:border-t [&+a]:border-border/60"
            >
              <span className="font-mono w-6 tabular-nums text-xs font-medium text-muted-foreground">
                {String(row.position).padStart(2, "0")}
              </span>
              <TeamCrest team={row.team} size={24} />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                {row.team.name}
              </span>
              <span className="tabular-nums text-xs text-muted-foreground">
                {row.played}
              </span>
              <span className="tabular font-display w-7 text-right font-bold text-gold">
                {row.points}
              </span>
            </a>
          ))}
        </div>
      )}

      <a
        href="/standings"
        className="flex items-center justify-center gap-1 border-t border-border/60 px-5 py-2.5 text-xs font-medium text-primary transition-colors hover:text-primary-300"
      >
        Ver tabla completa
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-border bg-card px-5 py-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="mt-1 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

function FixtureGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-7 w-10" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FixturesSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <SummarySkeleton />
      <FixtureGridSkeleton />
    </div>
  );
}

export default function FixturesPage() {
  const { data: matches = [], isLoading, error } = useMatches();

  const live = matches.filter((match) => match.status === "live");
  const finished = matches.filter((match) => match.status === "finished");
  const upcoming = matches
    .filter((match) => match.status === "scheduled")
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const nextMatch = upcoming[0];

  const totalGoals = finished.reduce(
    (sum, match) => sum + match.homeScore + match.awayScore,
    0
  );

  const upcomingGroups = groupByDay(upcoming, "asc");
  const resultsGroups = groupByDay(finished, "desc");
  const liveGroups = groupByDay(live, "asc");

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Calendario"
          title="Fixture y Resultados"
          description="Todos los partidos de la Tucumán Cup — en vivo ahora, los próximos y el historial completo de resultados de la temporada."
        />
        <Container className="py-10">
          {isLoading ? (
            <FixturesSkeleton />
          ) : error ? (
            <FixturesMessage>
              No se pudieron cargar los partidos.
            </FixturesMessage>
          ) : (
            <>
              <SummaryTiles
                total={matches.length}
                finished={finished.length}
                upcoming={upcoming.length}
                goals={totalGoals}
              />

              <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-[1.5fr_1fr]">
                <NextMatch match={nextMatch} />
                <StandingsMini />
              </div>

              <section className="mt-12">
                <Tabs
                  tabs={[
                    {
                      id: "all",
                      label: `Todos (${matches.length})`,
                      content: (
                        <>
                          {upcomingGroups.length > 0 && (
                            <div className="mb-8">
                              <SubHeading label="Próximos" />
                              <DayGroups
                                groups={upcomingGroups}
                                empty="No hay partidos próximos."
                              />
                            </div>
                          )}
                          <SubHeading label="Resultados" />
                          <DayGroups
                            groups={resultsGroups}
                            empty="No hay resultados todavía."
                          />
                        </>
                      ),
                    },
                    {
                      id: "live",
                      label: `En vivo (${live.length})`,
                      content: (
                        <DayGroups
                          groups={liveGroups}
                          empty="No hay partidos en vivo."
                        />
                      ),
                    },
                    {
                      id: "upcoming",
                      label: `Próximos (${upcoming.length})`,
                      content: (
                        <DayGroups
                          groups={upcomingGroups}
                          empty="No hay partidos próximos."
                        />
                      ),
                    },
                    {
                      id: "results",
                      label: `Resultados (${finished.length})`,
                      content: (
                        <DayGroups
                          groups={resultsGroups}
                          empty="No hay resultados todavía."
                        />
                      ),
                    },
                  ]}
                />
              </section>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}