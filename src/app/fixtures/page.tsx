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
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatches } from "@/hooks/useMatches";
import { useStandings } from "@/hooks/useStandings";
import { useTournament } from "@/hooks/useTournament";
import { cn } from "@/lib/utils";
import type { MatchResponseType } from "@/types/matches";

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

function MatchCount({
  count,
  singular,
  plural,
}: {
  count: number;
  singular: string;
  plural: string;
}) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      {count} {count === 1 ? singular : plural}
    </span>
  );
}

function MatchCardGrid({
  matches,
  variant,
}: {
  matches: MatchResponseType[];
  variant: "upcoming" | "result" | "live";
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {matches.map((match) => (
        <MatchCard
          key={match._id}
          match={match}
          variant={variant}
          href={`/matches/${match._id}`}
        />
      ))}
    </div>
  );
}

function MatchCardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-14 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-3 w-8" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-14 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="mx-auto mt-6 h-4 w-16" />
          <div className="mt-5 flex items-center justify-between border-t border-border/30 pt-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
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
                <>
                  <SectionHeader
                    eyebrow="Agenda"
                    title="Próximos partidos"
                    align="left"
                  />
                  <MatchCardGridSkeleton />
                  <section className="mt-12">
                    <SectionHeader
                      eyebrow="Resultados"
                      title="Últimos resultados"
                      align="left"
                    />
                    <MatchCardGridSkeleton />
                  </section>
                </>
              ) : error ? (
                <FixturesMessage onRetry={() => refetch()}>
                  No se pudieron cargar los partidos.
                </FixturesMessage>
              ) : (
                <>
                  {live.length > 0 && (
                    <section>
                      <SectionHeader
                        eyebrow="En directo"
                        title="En vivo"
                        align="left"
                        action={
                          <MatchCount
                            count={live.length}
                            singular="partido en vivo"
                            plural="partidos en vivo"
                          />
                        }
                      />
                      <MatchCardGrid variant="live" matches={live} />
                    </section>
                  )}

                  <section className={cn(live.length > 0 && "mt-12")}>
                    <SectionHeader
                      eyebrow="Agenda"
                      title="Próximos partidos"
                      align="left"
                      action={
                        <MatchCount
                          count={upcoming.length}
                          singular="partido"
                          plural="partidos"
                        />
                      }
                    />
                    {upcoming.length === 0 ? (
                      <FixturesMessage>
                        No hay próximos partidos programados.
                      </FixturesMessage>
                    ) : (
                      <MatchCardGrid variant="upcoming" matches={upcoming} />
                    )}
                  </section>

                  <section className="mt-12">
                    <SectionHeader
                      eyebrow="Resultados"
                      title="Últimos resultados"
                      align="left"
                      action={
                        <MatchCount
                          count={results.length}
                          singular="resultado"
                          plural="resultados"
                        />
                      }
                    />
                    {results.length === 0 ? (
                      <FixturesMessage>
                        Todavía no hay resultados registrados.
                      </FixturesMessage>
                    ) : (
                      <MatchCardGrid variant="result" matches={results} />
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