"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatches } from "@/hooks/useMatches";
import { useStandings } from "@/hooks/useStandings";
import { useTournament } from "@/hooks/useTournament";
import {
  formatDateBand,
  formatMatchDay,
  formatRoundRange,
} from "@/lib/matchDate";
import { cn } from "@/lib/utils";
import type { MatchResponseType } from "@/types/matches";
import type { Team } from "@/types/teams";

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
      {onRetry && <RetryButton onClick={onRetry} />}
    </div>
  );
}

function RetryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-display mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Reintentar
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </button>
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

type FixtureRound = {
  key: string;
  label: string;
  range: string;
  matches: MatchResponseType[];
};

function groupUpcomingByRound(matches: MatchResponseType[]): FixtureRound[] {
  const byKey = new Map<string, MatchResponseType[]>();
  const labelByKey = new Map<string, string>();
  for (const match of matches) {
    const key = match.round ?? match.date.slice(0, 10);
    const label = match.round ?? formatDateBand(match.date);
    const list = byKey.get(key);
    if (list) {
      list.push(match);
    } else {
      byKey.set(key, [match]);
      labelByKey.set(key, label);
    }
  }
  return [...byKey.entries()].map(([key, group]) => ({
    key,
    label: labelByKey.get(key) ?? "",
    range: formatRoundRange(group.map((match) => match.date)),
    matches: group,
  }));
}

type ResultsGroup = { key: string; label: string; matches: MatchResponseType[] };

function groupResultsByRound(matches: MatchResponseType[]): ResultsGroup[] {
  const byKey = new Map<string, MatchResponseType[]>();
  const labelByKey = new Map<string, string>();
  for (const match of matches) {
    const key = match.round ?? match.date.slice(0, 10);
    const label = match.round ?? formatDateBand(match.date);
    const list = byKey.get(key);
    if (list) {
      list.push(match);
    } else {
      byKey.set(key, [match]);
      labelByKey.set(key, label);
    }
  }
  return [...byKey.entries()].map(([key, group]) => ({
    key,
    label: labelByKey.get(key) ?? "",
    matches: group,
  }));
}

function LiveBand({ matches }: { matches: MatchResponseType[] }) {
  return (
    <section
      aria-labelledby="live-heading"
      className="border-y border-live/30 bg-live/5"
    >
      <div className="flex items-center gap-3 px-1 pt-8">
        <h2
          id="live-heading"
          className="font-display inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-live"
        >
          <span
            className="size-2 rounded-full bg-live animate-live-pulse"
            aria-hidden="true"
          />
          En vivo
        </h2>
        <span className="h-px flex-1 bg-live/20" aria-hidden="true" />
      </div>
      <ul className="divide-y divide-live/10">
        {matches.map((match) => (
          <LiveRow key={match._id} match={match} />
        ))}
      </ul>
    </section>
  );
}

function LiveTeam({
  team,
  align,
}: {
  team: Team;
  align: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center gap-3 text-center",
        align === "right"
          ? "sm:flex-row-reverse sm:text-right"
          : "sm:flex-row sm:text-left"
      )}
    >
      <TeamCrest team={team} size={44} className="shrink-0 sm:size-14" />
      <p className="font-display line-clamp-2 min-w-0 text-base font-semibold uppercase leading-tight tracking-wide text-foreground sm:text-xl">
        {team.name}
      </p>
    </div>
  );
}

function LiveRow({ match }: { match: MatchResponseType }) {
  const { dayMonth } = formatMatchDay(match.date);

  return (
    <li>
      <Link
        href={`/matches/${match._id}`}
        className="group grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-1 py-7 transition-colors hover:bg-live/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:gap-8"
      >
        <LiveTeam team={match.homeTeam} align="left" />
        <div className="flex shrink-0 flex-col items-center gap-1.5 text-center">
          <span className="font-display tabular text-4xl font-bold leading-none text-live sm:text-5xl">
            <span>{match.homeScore}</span>
            <span className="mx-2 text-live/40" aria-hidden="true">
              –
            </span>
            <span>{match.awayScore}</span>
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {dayMonth}
          </span>
        </div>
        <LiveTeam team={match.awayTeam} align="right" />
      </Link>
    </li>
  );
}

function DuelTeam({ team }: { team: Team }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
      <TeamCrest
        team={team}
        size={32}
        className="shrink-0 sm:hidden transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <TeamCrest
        team={team}
        size={48}
        className="hidden shrink-0 sm:inline-flex transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <p className="font-display line-clamp-2 min-w-0 text-sm font-semibold uppercase leading-tight tracking-wide text-foreground sm:min-h-[2.5rem] sm:text-base">
        {team.name}
      </p>
    </div>
  );
}

function MatchDuel({ match }: { match: MatchResponseType }) {
  return (
    <li>
      <Link
        href={`/matches/${match._id}`}
        className="group block px-1 py-4 transition-colors bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:py-5"
      >
        <p className="flex items-center gap-x-2 text-xs text-muted-foreground sm:hidden">
          <span className="tabular font-semibold text-foreground">
            {match.time}
          </span>
          <span>HS</span>
          {match.venue && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{match.venue}</span>
            </>
          )}
        </p>

        <div className="mt-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:mt-0 sm:gap-5">
          <DuelTeam team={match.homeTeam} />

          <div className="flex w-6 shrink-0 flex-col items-center sm:w-28">
            <span
              className="font-display text-xs font-semibold tracking-widest text-muted-foreground/40"
              aria-hidden="true"
            >
              VS
            </span>
            <span
              className="mt-1 h-px w-6 bg-border/50 sm:hidden"
              aria-hidden="true"
            />
            <dl className="hidden flex-col items-center gap-1 text-center sm:flex">
              <dd className="font-display tabular text-lg font-bold text-foreground">
                {match.time}{" "}
                <span className="text-xs font-medium text-muted-foreground">
                  HS
                </span>
              </dd>
              {match.venue && (
                <dd className="max-w-[7rem] truncate text-xs text-muted-foreground">
                  {match.venue}
                </dd>
              )}
              {match.homeTeam.city && (
                <dd className="max-w-[7rem] truncate text-xs text-muted-foreground/70">
                  {match.homeTeam.city}
                </dd>
              )}
            </dl>
          </div>

          <DuelTeam team={match.awayTeam} />
        </div>
      </Link>
    </li>
  );
}

function FixtureSheet({
  round,
  first,
}: {
  round: FixtureRound;
  first: boolean;
}) {
  return (
    <section>
      <div
        className={cn(
          "mb-5 flex items-end justify-between gap-4 border-b border-border pb-3",
          first ? "mt-1" : "mt-12"
        )}
      >
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
          {round.label}
        </h3>
        <p className="truncate text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {round.range}
        </p>
      </div>
      <ul className="divide-y divide-border/60">
        {round.matches.map((match) => (
          <MatchDuel key={match._id} match={match} />
        ))}
      </ul>
    </section>
  );
}

function FixtureSheets({ rounds }: { rounds: FixtureRound[] }) {
  return (
    <div>
      {rounds.map((round, index) => (
        <FixtureSheet key={round.key} round={round} first={index === 0} />
      ))}
    </div>
  );
}

function ResultTeam({
  team,
  strong,
  align,
}: {
  team: Team;
  strong: boolean;
  align: "left" | "right";
}) {
  return (
    <span
      className={cn(
        "flex min-w-0 items-center gap-2.5",
        align === "right" ? "justify-end text-right" : "text-left"
      )}
    >
      <TeamCrest team={team} size={24} className="shrink-0" />
      <span
        className={cn(
          "font-display min-w-0 truncate text-sm font-semibold uppercase leading-tight tracking-wide",
          strong ? "text-foreground" : "font-medium text-muted-foreground"
        )}
      >
        {team.name}
      </span>
    </span>
  );
}

function ResultRow({ match }: { match: MatchResponseType }) {
  const { dayMonth } = formatMatchDay(match.date);
  const winner =
    match.homeScore > match.awayScore
      ? "home"
      : match.awayScore > match.homeScore
        ? "away"
        : "";

  const homeScoreClass =
    winner === "home"
      ? "text-gold"
      : winner === ""
        ? "text-foreground/80"
        : "text-muted-foreground";
  const awayScoreClass =
    winner === "away"
      ? "text-gold"
      : winner === ""
        ? "text-foreground/80"
        : "text-muted-foreground";

  return (
    <li>
      <Link
        href={`/matches/${match._id}`}
        className="group grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-1 py-5 transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:gap-6"
      >
        <ResultTeam team={match.homeTeam} strong={winner === "home"} align="left" />
        <div className="flex shrink-0 flex-col items-center gap-1 text-center">
          <span className="font-display tabular text-2xl font-bold sm:text-3xl">
            <span className={homeScoreClass}>{match.homeScore}</span>
            <span className="mx-1.5 text-muted-foreground/40" aria-hidden="true">
              –
            </span>
            <span className={awayScoreClass}>{match.awayScore}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span>{dayMonth}</span>
            {match.venue && (
              <>
                <span aria-hidden="true">·</span>
                <span className="max-w-[8rem] truncate">{match.venue}</span>
              </>
            )}
            <ArrowRight
              className="size-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            />
          </span>
        </div>
        <ResultTeam team={match.awayTeam} strong={winner === "away"} align="right" />
      </Link>
    </li>
  );
}

function ResultsArchive({ groups }: { groups: ResultsGroup[] }) {
  return (
    <div>
      {groups.map((group, index) => (
        <section key={group.key}>
          <div
            className={cn(
              "mb-1 flex items-center gap-3",
              index === 0 ? "mt-2" : "mt-10"
            )}
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </h3>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
          <ul className="divide-y divide-border/60">
            {group.matches.map((match) => (
              <ResultRow key={match._id} match={match} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function MatchDuelSkeleton() {
  return (
    <div className="flex items-center gap-3 px-1 py-5 sm:gap-5">
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:gap-3">
        <Skeleton className="size-8 rounded-full sm:size-10" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex w-6 shrink-0 flex-col items-center gap-2 sm:w-28">
        <Skeleton className="h-3 w-6" />
        <Skeleton className="mt-1 h-5 w-12" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:gap-3">
        <Skeleton className="size-8 rounded-full sm:size-10" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

function ResultRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 px-1 py-6 sm:gap-6">
      <div className="flex min-w-0 items-center gap-2.5">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex min-w-0 items-center gap-2.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-6 rounded-full" />
      </div>
    </div>
  );
}

function FixturesMainSkeleton() {
  return (
    <>
      <SectionHeader eyebrow="Agenda" title="Próximos partidos" align="left" />

      <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="divide-y divide-border/60">
        <MatchDuelSkeleton />
        <MatchDuelSkeleton />
      </div>

      <div className="mt-12 flex items-end justify-between gap-4 border-b border-border pb-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-36" />
      </div>
      <div className="divide-y divide-border/60">
        <MatchDuelSkeleton />
        <MatchDuelSkeleton />
      </div>

      <section className="mt-12">
        <SectionHeader eyebrow="Resultados" title="Últimos resultados" align="left" />
        <div className="divide-y divide-border/60">
          <ResultRowSkeleton />
          <ResultRowSkeleton />
          <ResultRowSkeleton />
        </div>
      </section>
    </>
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
            <RetryButton onClick={() => refetch()} />
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
                        "font-display w-6 tabular text-sm font-semibold",
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
                    <span className="tabular w-8 text-xs font-medium text-muted-foreground">
                      {row.played}
                    </span>
                    <span
                      className={cn(
                        "tabular w-8 text-xs font-medium",
                        row.goalDifference > 0
                          ? "text-success"
                          : row.goalDifference < 0
                            ? "text-destructive"
                            : "text-muted-foreground"
                      )}
                    >
                      {row.goalDifference > 0 ? "+" : ""}
                      {row.goalDifference}
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
  const { data: tournament } = useTournament();

  const byDateAsc = (a: MatchResponseType, b: MatchResponseType) =>
    new Date(a.date).getTime() - new Date(b.date).getTime();
  const byDateDesc = (a: MatchResponseType, b: MatchResponseType) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

  const live = matches.filter((match) => match.status === "live").sort(byDateAsc);
  const upcoming = matches
    .filter((match) => match.status === "scheduled")
    .sort(byDateAsc);
  const results = matches
    .filter((match) => match.status === "finished")
    .sort(byDateDesc)
    .slice(0, 12);

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          compact
          eyebrow="Calendario"
          title="Fixture y Resultados"
          description="Los próximos partidos y los resultados de la Tucumán Cup, jornada por jornada."
          image="/images/resultados.jfif"
        />
        <Container className="py-10">
          {tournament && (
            <p className="mb-10 max-w-[620px] text-sm leading-relaxed text-muted-foreground sm:text-base">
              <span className="font-display font-semibold uppercase tracking-wide text-foreground">
                {tournament.name} {tournament.season}
              </span>
              {tournament.format && <> · {tournament.format}</>}
            </p>
          )}

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
            <div className="min-w-0">
              {isLoading ? (
                <FixturesMainSkeleton />
              ) : error ? (
                <FixturesMessage onRetry={() => refetch()}>
                  No se pudieron cargar los partidos.
                </FixturesMessage>
              ) : (
                <>
                  {live.length > 0 && <LiveBand matches={live} />}

                  <section className={cn(live.length > 0 && "mt-12")}>
                    <SectionHeader
                      eyebrow="Agenda"
                      title="Próximos partidos"
                      align="left"
                    />
                    {upcoming.length === 0 ? (
                      <FixturesMessage>
                        No hay próximos partidos programados.
                      </FixturesMessage>
                    ) : (
                      <FixtureSheets rounds={groupUpcomingByRound(upcoming)} />
                    )}
                  </section>

                  <section className="mt-12">
                    <SectionHeader
                      eyebrow="Resultados"
                      title="Últimos resultados"
                      align="left"
                    />
                    {results.length === 0 ? (
                      <FixturesMessage>
                        Todavía no hay resultados registrados.
                      </FixturesMessage>
                    ) : (
                      <ResultsArchive groups={groupResultsByRound(results)} />
                    )}
                  </section>
                </>
              )}
            </div>

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