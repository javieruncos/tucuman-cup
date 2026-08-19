"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TournamentIdentity } from "@/components/tournament/TournamentIdentity";
import { StandingsWidget } from "@/components/statistics/StandingsWidget";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { useStandings } from "@/hooks/useStandings";
import { useTournament } from "@/hooks/useTournament";

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

function LeaderEditorial() {
  const {
    data: standings = [],
    isLoading,
    isFetching,
    error,
  } = useStandings();
  const loading = isLoading || (isFetching && standings.length === 0);
  const leader =
    !loading && !error
      ? standings.find((row) => row.position === 1)
      : undefined;

  return (
    <section
      aria-label="Líder del torneo"
      className="mt-12 border-t border-border/40 pt-8"
    >
      <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
        Líder del torneo
      </p>
      {loading ? (
        <Skeleton className="mt-3 h-8 w-48" />
      ) : leader ? (
        <>
          <p className="font-display mt-3 flex flex-wrap items-center gap-3 text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
            <TeamCrest team={leader.team} size={40} />
            {leader.team.name}
            <span className="text-gold"> · {leader.points} pts</span>
          </p>
          <p className="mt-2 max-w-[620px] text-sm leading-relaxed text-muted-foreground sm:text-base">
            Encabeza la clasificación y marca el ritmo de esta temporada.
          </p>
        </>
      ) : null}
    </section>
  );
}

export default function StandingsPage() {
  const {
    data: tournament,
    isLoading: tournamentLoading,
    error: tournamentError,
  } = useTournament();
  const format =
    !tournamentLoading && !tournamentError && tournament?.format
      ? tournament.format
      : null;

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          compact
          eyebrow="La tabla"
          title="La clasificación"
          description="La clasificación de la Tucumán Cup, actualizada con cada resultado de la temporada."
          image="/images/fixture.jfif"
        >
          <TournamentIdentity />
        </PageHero>
        <Container className="py-10">
          {format && (
            <section
              aria-labelledby="como-se-juega"
              className="border-y border-border/40 bg-surface-1"
            >
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="como-se-juega"
                  className="font-display text-xs font-semibold uppercase tracking-widest text-gold"
                >
                  Cómo se juega
                </h2>
                <p className="mt-2 max-w-[620px] text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {format}
                </p>
              </div>
            </section>
          )}

          <div className="mt-10">
            <StandingsWidget />
          </div>

          <section aria-label="Glosario" className="mt-6 border-t border-border/40 pt-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground sm:text-sm">
              <span>
                <span className="font-display font-semibold text-foreground">
                  PJ
                </span>{" "}
                · Partidos jugados
              </span>
              <span>
                <span className="font-display font-semibold text-foreground">
                  DG
                </span>{" "}
                · Diferencia de goles
              </span>
              <span>
                <span className="font-display font-semibold text-foreground">
                  PTS
                </span>{" "}
                · Puntos
              </span>
              <span>
                <span className="font-display font-semibold text-foreground">
                  Racha
                </span>{" "}
                · Últimos 5 partidos
              </span>
              <span>
                <span className="font-display font-semibold text-foreground">
                  W · D · L
                </span>{" "}
                · Victoria · Empate · Derrota
              </span>
            </div>
          </section>

          <LeaderEditorial />

          <div className="mt-10 border-t border-border pt-6">
            <SubHeading label="Explorar" />
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
              aria-label="Más del torneo"
            >
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
                href="/fixtures"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Fixture
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/stats"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Estadísticas
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