"use client";
import Link from "next/link";
import { use } from "react";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchCard } from "@/components/matches/MatchCard";
import { NewsCard } from "@/components/news/NewsCard";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { TeamDetailSkeleton } from "@/components/teams/TeamDetailSkeleton";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatches } from "@/hooks/useMatches";
import { useNews } from "@/hooks/useNews";
import { useStandings } from "@/hooks/useStandings";
import { useTeam } from "@/hooks/useTeam";
import { useTeamPlayers } from "@/hooks/useTeamPlayers";
import { cn } from "@/lib/utils";
import type { MatchResponseType } from "@/types/matches";
import type { PlayerPosition } from "@/types/players";

const POSITION_LABEL: Record<PlayerPosition, string> = {
  GK: "Arquero",
  DEF: "Defensor",
  MID: "Mediocampista",
  FWD: "Delantero",
};

const POSITION_ORDER: Record<PlayerPosition, number> = {
  GK: 0,
  DEF: 1,
  MID: 2,
  FWD: 3,
};

const formTile: Record<"W" | "D" | "L", string> = {
  W: "bg-success text-success-foreground",
  D: "bg-muted text-muted-foreground",
  L: "bg-destructive/80 text-white",
};

function FormTiles({ form }: { form?: Array<"W" | "D" | "L"> }) {
  if (!form || form.length === 0) return null;
  return (
    <div className="flex gap-1">
      {form.map((result, index) => (
        <span
          key={index}
          title={
            result === "W" ? "Victoria" : result === "D" ? "Empate" : "Derrota"
          }
          className={cn(
            "grid size-5 place-items-center rounded text-[10px] font-bold",
            formTile[result]
          )}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

function getTeamForm(
  matches: MatchResponseType[],
  teamId: string
): Array<"W" | "D" | "L"> {
  const finished = matches.filter(
    (m) =>
      m.status === "finished" &&
      (m.homeTeam._id === teamId || m.awayTeam._id === teamId)
  );

  const last = finished
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .reverse();

  return last.map((m) => {
    const isHome = m.homeTeam._id === teamId;
    const scored = isHome ? m.homeScore : m.awayScore;
    const conceded = isHome ? m.awayScore : m.homeScore;

    if (scored > conceded) return "W";
    if (scored < conceded) return "L";
    return "D";
  });
}

function SquadSection({
  teamId,
  teamName,
}: {
  teamId: string;
  teamName: string;
}) {
  const {
    data: players = [],
    isLoading,
    isError,
    refetch,
  } = useTeamPlayers(teamId);

  const sorted = [...players].sort(
    (a, b) =>
      POSITION_ORDER[a.position] - POSITION_ORDER[b.position] ||
      a.number - b.number
  );

  return (
    <section className="mt-12">
      <SectionHeader
        align="left"
        eyebrow="Plantel"
        title={`Plantel de ${teamName}`}
      />
      {isLoading ? (
        <div className="divide-y divide-border/60">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 py-3.5">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="ml-auto h-3 w-24" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
          <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
            No se pudo cargar el plantel
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="font-display mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-primary-300"
          >
            Reintentar
          </button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
          <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
            Plantel no cargado
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Los jugadores de {teamName} aparecerán acá.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border-y border-border">
          <div className="divide-y divide-border/60">
            {sorted.map((player) => (
              <div
                key={player._id}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-3.5 sm:grid-cols-[3rem_1fr_auto]"
              >
                <span className="tabular font-display text-sm font-bold text-muted-foreground/60">
                  {player.number}
                </span>
                <span className="min-w-0 truncate font-medium text-foreground">
                  {player.name}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {POSITION_LABEL[player.position]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: team, isLoading, error } = useTeam(id);
  const { data: standings = [], isLoading: standingsLoading } = useStandings();
  const {
    data: matches = [],
    isLoading: matchesLoading,
    error: matchesError,
  } = useMatches();
  const {
    data: news = [],
    isLoading: newsLoading,
    isError: newsIsError,
  } = useNews();

  const standing = standings.find((row) => row.team._id === id);
  const teamMatchesList = team
    ? matches.filter(
      (m) => m.homeTeam._id === team._id || m.awayTeam._id === team._id
    )
    : [];
  const form = getTeamForm(matches, id);

  const upcoming = teamMatchesList
    .filter((m) => m.status !== "finished")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const recent = teamMatchesList
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const teamNews = team
    ? news
      .filter((article) => article.team?._id === team._id)
      .slice(0, 3)
    : [];

  return (
    <>
      <PortalNavbar />
      {isLoading ? (
        <TeamDetailSkeleton />
      ) : error || !team ? (
        <main className="flex-1">
          <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
              Equipo
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold uppercase tracking-wide text-balance sm:text-4xl">
              Equipo no encontrado
            </h1>
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              El equipo que buscás no existe o ya no está disponible.
            </p>
            <Link
              href="/teams"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a equipos
            </Link>
          </Container>
        </main>
      ) : (
        <main className="flex-1">
          <section className="relative overflow-hidden border-b border-border bg-card/40">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background: `radial-gradient(120% 90% at 15% 0%, ${team.color}55 0%, transparent 60%)`,
              }}
              aria-hidden="true"
            />
            <div
              className="stadium-glow pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <Container className="relative py-10 sm:py-14">
              <Link
                href="/teams"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                Equipos
              </Link>
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <TeamCrest team={team} size={88} />
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                    {team.city}
                  </p>
                  <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
                    {team.name}
                  </h1>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Trophy className="size-4 text-primary" aria-hidden="true" />
                      Est. {team.founded} · {team.city}
                    </span>
                    {standing && (
                      <span className="font-semibold text-foreground">
                        #{standing.position} en la tabla
                      </span>
                    )}
                    {form.length > 0 && <FormTiles form={form} />}
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <Container className="py-10">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
              <div className="bg-card p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Fundación
                </p>
                <p className="font-display mt-2 text-lg font-semibold uppercase text-foreground">
                  {team.founded}
                </p>
              </div>
              <div className="bg-card p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Ciudad
                </p>
                <p className="font-display mt-2 text-lg font-semibold uppercase text-foreground">
                  {team.city}
                </p>
              </div>
              <div className="bg-card p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Posición
                </p>
                <p className="font-display mt-2 text-lg font-semibold uppercase text-foreground">
                  {standing ? `#${standing.position}` : "—"}
                </p>
              </div>
              <div className="bg-card p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Últimos resultados
                </p>
                <div className="mt-3">
                  {form.length > 0 ? (
                    <FormTiles form={form} />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Sin resultados
                    </p>
                  )}
                </div>
              </div>
            </div>

            <section className="mt-12">
              <SectionHeader align="left" eyebrow="Números" title="Estadísticas" />
              {standingsLoading ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <Skeleton className="mx-auto h-3 w-16" />
                      <Skeleton className="mx-auto mt-3 h-9 w-12" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      Puntos
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.points ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      PJ
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.played ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      PG
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.won ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      PP
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.lost ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      PE
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.drawn ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      GF
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.goalsFor ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      GC
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.goalsAgainst ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      DIF
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                      {standing?.goalDifference ?? 0}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="mt-12">
              <SectionHeader
                align="left"
                eyebrow="Calendario"
                title="Próximos partidos"
                action={
                  <Link
                    href="/fixtures"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-300"
                  >
                    Ver fixture
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              />
              {matchesLoading ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <Skeleton className="h-3 w-20" />
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
              ) : matchesError ? (
                <p className="text-sm text-muted-foreground">
                  No se pudieron cargar los próximos partidos.
                </p>
              ) : upcoming.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
                  <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                    Sin partidos próximos
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Vuelve más cerca de la fecha.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {upcoming.map((match) => (
                    <MatchCard
                      key={match._id}
                      match={match}
                      href={`/matches/${match._id}`}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="mt-12">
              <SectionHeader
                align="left"
                eyebrow="Historial"
                title="Resultados recientes"
                action={
                  <Link
                    href="/fixtures"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-300"
                  >
                    Ver resultados
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              />
              {matchesLoading ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <Skeleton className="h-3 w-20" />
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
              ) : matchesError ? (
                <p className="text-sm text-muted-foreground">
                  No se pudieron cargar los resultados.
                </p>
              ) : recent.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
                  <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                    Sin resultados aún
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    El historial se completará con los próximos partidos.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {recent.map((match) => (
                    <MatchCard
                      key={match._id}
                      match={match}
                      href={`/matches/${match._id}`}
                    />
                  ))}
                </div>
              )}
            </section>

            <SquadSection teamId={id} teamName={team.name} />

            <section className="mt-12">
              <SectionHeader
                align="left"
                eyebrow="Cobertura"
                title={`Noticias de ${team.name}`}
                action={
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-300"
                  >
                    Ver todas
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              />
              {newsLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
                    >
                      <div className="h-20 w-24 shrink-0 animate-pulse rounded-md bg-muted" />
                      <div className="min-w-0 flex-1 space-y-2 py-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : newsIsError ? (
                <p className="text-sm text-muted-foreground">
                  No se pudieron cargar las noticias.
                </p>
              ) : teamNews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
                  <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                    Sin noticias de {team.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Las novedades del equipo aparecerán acá.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {teamNews.map((article) => (
                    <NewsCard
                      key={article._id}
                      article={article}
                      href={`/news/${article._id}`}
                    />
                  ))}
                </div>
              )}
            </section>
          </Container>
        </main>
      )}
      <Footer />
    </>
  );
}