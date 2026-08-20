"use client";
import Link from "next/link";
import { use, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchCard } from "@/components/matches/MatchCard";
import { NewsCard } from "@/components/news/NewsCard";
import { FormTiles } from "@/components/shared/FormTiles";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { TeamDetailSkeleton } from "@/components/teams/TeamDetailSkeleton";
import { Container } from "@/components/ui/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Footer } from "@/components/ui/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatches } from "@/hooks/useMatches";
import { useNews } from "@/hooks/useNews";
import { useStandings } from "@/hooks/useStandings";
import { useTeam } from "@/hooks/useTeam";
import { useTeamPlayers } from "@/hooks/useTeamPlayers";
import { getTeamForm } from "@/lib/teamForm";
import { cn } from "@/lib/utils";
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

function SectionError({
  title,
  message,
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
      {title && (
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
      )}
      {message && (
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      )}
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={onRetry}
      >
        Reintentar
      </Button>
    </div>
  );
}

function EmptyBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
      <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function SectionActionLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-300"
    >
      {children}
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </Link>
  );
}

function MatchCardsSkeleton({ count }: { count: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
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
  );
}

function StandingBandSkeleton() {
  return (
    <div className="mt-4 border-y border-border">
      <div className="grid grid-cols-2 divide-x divide-y divide-border/40 sm:grid-cols-5 sm:divide-y-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="px-4 py-5 sm:px-6 sm:py-7">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="mt-2 h-8 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
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
        <SectionError
          title="No se pudo cargar el plantel"
          onRetry={() => refetch()}
        />
      ) : sorted.length === 0 ? (
        <EmptyBox
          title="Plantel no cargado"
          description={`Los jugadores de ${teamName} aparecerán acá.`}
        />
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
    refetch: matchesRefetch,
  } = useMatches();
  const {
    data: news = [],
    isLoading: newsLoading,
    isError: newsIsError,
    refetch: newsRefetch,
  } = useNews();

  const standing = standings.find((row) => row.team._id === id);
  const teamMatchesList = team
    ? matches.filter(
      (m) => m.homeTeam._id === team._id || m.awayTeam._id === team._id
    )
    : [];
  const form = getTeamForm(matches, id);
  const bandLoading = standingsLoading || matchesLoading;

  const live = teamMatchesList.filter((m) => m.status === "live");
  const upcoming = teamMatchesList
    .filter((m) => m.status === "scheduled")
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
              className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
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
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-primary">
                    {team.city}
                  </p>
                  <h1 className="font-display mt-2 break-words text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
                    {team.name}
                  </h1>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Trophy className="size-4 text-primary" aria-hidden="true" />
                      Est. {team.founded} · {team.city}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <Container className="py-10">
            <section aria-labelledby="team-situation">
              <div className="flex items-center gap-3">
                <h2
                  id="team-situation"
                  className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  Situación en el torneo
                </h2>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>

              {bandLoading ? (
                <StandingBandSkeleton />
              ) : (
                <div className="mt-4 border-y border-border">
                  <div className="grid grid-cols-2 sm:grid-cols-5">
                    <div className="px-4 py-5 sm:px-6 sm:py-7">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Posición
                      </p>
                      <p className="font-display tabular mt-1.5 text-3xl font-bold text-gold sm:text-4xl">
                        {standing ? `#${standing.position}` : "—"}
                      </p>
                    </div>
                    <div className="border-l border-border/40 px-4 py-5 sm:px-6 sm:py-7">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Puntos
                      </p>
                      <p className="font-display tabular mt-1.5 text-3xl font-bold text-gold sm:text-4xl">
                        {standing ? standing.points : "—"}
                      </p>
                    </div>
                    <div className="border-t border-border/40 px-4 py-5 sm:border-l sm:border-t-0 sm:border-border/40 sm:px-6 sm:py-7">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        PJ
                      </p>
                      <p className="font-display tabular mt-1.5 text-3xl font-bold text-foreground sm:text-4xl">
                        {standing ? standing.played : "—"}
                      </p>
                    </div>
                    <div className="border-l border-t border-border/40 px-4 py-5 sm:border-t-0 sm:px-6 sm:py-7">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        DIF
                      </p>
                      <p
                        className={cn(
                          "font-display tabular mt-1.5 text-3xl font-bold sm:text-4xl",
                          standing
                            ? standing.goalDifference > 0
                              ? "text-success"
                              : standing.goalDifference < 0
                                ? "text-destructive"
                                : "text-muted-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {standing
                          ? `${standing.goalDifference > 0 ? "+" : ""}${standing.goalDifference}`
                          : "—"}
                      </p>
                    </div>
                    <div className="col-span-2 border-t border-border/40 px-4 py-5 sm:col-span-1 sm:border-l sm:border-t-0 sm:border-border/40 sm:px-6 sm:py-7">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Forma
                      </p>
                      {form.length > 0 ? (
                        <div className="flex min-h-[2.25rem] items-center">
                          <FormTiles form={form} align="left" />
                        </div>
                      ) : (
                        <p className="font-display tabular mt-1.5 text-3xl font-bold text-foreground/60 sm:text-4xl">
                          —
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {live.length > 0 && (
              <section className="mt-12">
                <SectionHeader
                  align="left"
                  eyebrow="En directo"
                  title="En vivo"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {live.map((match) => (
                    <MatchCard
                      key={match._id}
                      match={match}
                      variant="live"
                      href={`/matches/${match._id}`}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="mt-12">
              <SectionHeader
                align="left"
                eyebrow="Calendario"
                title="Próximos partidos"
                action={
                  <SectionActionLink href="/fixtures">Ver fixture</SectionActionLink>
                }
              />
              {matchesLoading ? (
                <MatchCardsSkeleton count={2} />
              ) : matchesError ? (
                <SectionError
                  message="No se pudieron cargar los próximos partidos."
                  onRetry={() => matchesRefetch()}
                />
              ) : upcoming.length === 0 ? (
                <EmptyBox
                  title="Sin partidos próximos"
                  description="Vuelve más cerca de la fecha."
                />
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
                  <SectionActionLink href="/fixtures">Ver resultados</SectionActionLink>
                }
              />
              {matchesLoading ? (
                <MatchCardsSkeleton count={3} />
              ) : matchesError ? (
                <SectionError
                  message="No se pudieron cargar los resultados."
                  onRetry={() => matchesRefetch()}
                />
              ) : recent.length === 0 ? (
                <EmptyBox
                  title="Sin resultados aún"
                  description="El historial se completará con los próximos partidos."
                />
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
                  <SectionActionLink href="/news">Ver todas</SectionActionLink>
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
                <SectionError
                  message="No se pudieron cargar las noticias."
                  onRetry={() => newsRefetch()}
                />
              ) : teamNews.length === 0 ? (
                <EmptyBox
                  title={`Sin noticias de ${team.name}`}
                  description="Las novedades del equipo aparecerán acá."
                />
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