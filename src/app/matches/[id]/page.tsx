"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, MapPin } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchCard } from "@/components/matches/MatchCard";
import { MatchDetailSkeleton } from "@/components/matches/MatchDetailSkeleton";
import { MatchStatBars } from "@/components/matches/MatchStatBars";
import { MatchTimeline } from "@/components/matches/MatchTimeline";
import { FormTiles } from "@/components/shared/FormTiles";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatch } from "@/hooks/useMatch";
import { useMatches } from "@/hooks/useMatches";
import { useMatchEvents } from "@/hooks/useMatchEvents";
import { useMatchStats } from "@/hooks/useMatchStats";
import { useStandings } from "@/hooks/useStandings";
import { useTournament } from "@/hooks/useTournament";
import { getTeamForm, type FormResult } from "@/lib/teamForm";
import type { MatchResponseType, MatchStatus } from "@/types/matches";
import type { Standing } from "@/types/standings";
import type { Team } from "@/types/teams";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(date))
    .toUpperCase()
    .replace(".", "");
}

function StatusPill({ status }: { status: MatchStatus }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-xs font-semibold text-live">
        <span
          className="size-1.5 rounded-full bg-live animate-live-pulse"
          aria-hidden="true"
        />
        En vivo
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
        Finalizado
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
      Próximo
    </span>
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

function TeamContextBlock({
  team,
  standing,
  form,
  next,
}: {
  team: Team;
  standing?: Standing;
  form: FormResult[];
  next?: MatchResponseType;
}) {
  return (
    <div className="bg-card p-5">
      <div className="flex items-center gap-3">
        <TeamCrest team={team} size={40} />
        <p className="font-display min-w-0 truncate text-base font-bold uppercase tracking-wide text-foreground">
          {team.name}
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Posición
          </dt>
          <dd className="tabular font-display mt-0.5 text-xl font-bold text-foreground">
            {standing ? `#${standing.position}` : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Puntos
          </dt>
          <dd className="tabular font-display mt-0.5 text-xl font-bold text-gold">
            {standing ? standing.points : "—"}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Forma reciente
        </p>
        <div className="mt-1.5">
          {form.length > 0 ? (
            <FormTiles form={form} align="left" />
          ) : (
            <p className="text-xs text-muted-foreground">Sin resultados</p>
          )}
        </div>
      </div>

      {next && (
        <Link
          href={`/matches/${next._id}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Próximo:{" "}
          {next.homeTeam._id === team._id
            ? next.awayTeam.shortName
            : next.homeTeam.shortName}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      )}

      <Link
        href={`/teams/${team._id}`}
        className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Ver ficha del equipo
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: match, isLoading, error } = useMatch(id);
  const { data: allMatches = [], isLoading: allMatchesLoading } = useMatches();
  const { data: standings = [], isLoading: standingsLoading } = useStandings();
  const { data: tournament } = useTournament();
  const {
    data: events = [],
    isLoading: isEventsLoading,
    isError: isEventsError,
  } = useMatchEvents(id);
  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useMatchStats(id);

  const played = match?.status === "live" || match?.status === "finished";
  const halftime =
    played && match?.halftimeScore?.home != null && match?.halftimeScore.away != null
      ? match.halftimeScore
      : null;

  const homeStanding = match
    ? standings.find((row) => row.team._id === match.homeTeam._id)
    : undefined;
  const awayStanding = match
    ? standings.find((row) => row.team._id === match.awayTeam._id)
    : undefined;
  const homeForm = match ? getTeamForm(allMatches, match.homeTeam._id) : [];
  const awayForm = match ? getTeamForm(allMatches, match.awayTeam._id) : [];

  const upcoming = allMatches
    .filter(
      (m) =>
        m._id !== id &&
        m.status === "scheduled" &&
        (m.homeTeam._id === match?.homeTeam._id ||
          m.awayTeam._id === match?.homeTeam._id ||
          m.homeTeam._id === match?.awayTeam._id ||
          m.awayTeam._id === match?.awayTeam._id)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const nextFor = (teamId: string) =>
    allMatches
      .filter(
        (m) =>
          m._id !== id &&
          m.status === "scheduled" &&
          (m.homeTeam._id === teamId || m.awayTeam._id === teamId)
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const homeNext = match ? nextFor(match.homeTeam._id) : undefined;
  const awayNext = match ? nextFor(match.awayTeam._id) : undefined;

  return (
    <>
      <PortalNavbar />
      {isLoading ? (
        <MatchDetailSkeleton />
      ) : error || !match ? (
        <main className="flex-1">
          <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
              Partido
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold uppercase tracking-wide text-balance sm:text-4xl">
              Partido no encontrado
            </h1>
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              El partido que buscás no existe o ya no está disponible.
            </p>
            <Link
              href="/fixtures"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al fixture
            </Link>
          </Container>
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero */}
          <section className="relative overflow-hidden border-b border-border bg-card/40">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background: `radial-gradient(120% 90% at 15% 0%, ${match.homeTeam.color}55 0%, transparent 60%), radial-gradient(120% 90% at 85% 0%, ${match.awayTeam.color}55 0%, transparent 60%)`,
              }}
              aria-hidden="true"
            />
            <div
              className="stadium-glow pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <Container className="relative py-10 sm:py-14">
              <nav
                aria-label="Migas de pan"
                className="mb-8 flex items-center gap-3"
              >
                <Link
                  href="/fixtures"
                  className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Partidos
                </Link>
                {match.round && (
                  <>
                    <ChevronRight
                      className="size-3.5 text-muted-foreground/40"
                      aria-hidden="true"
                    />
                    <span className="font-display text-xs font-semibold uppercase tracking-widest text-foreground">
                      {match.round}
                    </span>
                  </>
                )}
              </nav>

              <div className="flex flex-col items-center gap-4 text-center">
                {tournament && (
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                    {tournament.name} · {tournament.season}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                    {formatDate(match.date)}
                  </p>
                  <span className="size-1 rounded-full bg-border" aria-hidden="true" />
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {match.time}
                  </p>
                  {match.round && (
                    <>
                      <span className="size-1 rounded-full bg-border" aria-hidden="true" />
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        {match.round}
                      </p>
                    </>
                  )}
                </div>
                <StatusPill status={match.status} />
              </div>

              <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
                <Link
                  href={`/teams/${match.homeTeam._id}`}
                  className="group flex flex-col items-center gap-3 text-center md:flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <TeamCrest team={match.homeTeam} size={88} />
                  <p
                    className="font-display truncate max-w-[16rem] text-xl font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-gold sm:text-2xl"
                    title={match.homeTeam.name}
                  >
                    {match.homeTeam.name}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Local
                  </span>
                </Link>

                <div className="flex flex-col items-center gap-1.5">
                  <div className="tabular font-display flex items-center gap-4 text-5xl font-bold sm:text-6xl">
                    <span
                      className={played ? "text-foreground" : "text-muted-foreground"}
                    >
                      {played ? match.homeScore : "–"}
                    </span>
                    <span className="text-muted-foreground/60" aria-hidden="true">
                      –
                    </span>
                    <span
                      className={played ? "text-foreground" : "text-muted-foreground"}
                    >
                      {played ? match.awayScore : "–"}
                    </span>
                  </div>
                  {halftime && (
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Descanso {halftime.home}–{halftime.away}
                    </p>
                  )}
                  {match.venue && (
                    <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {match.venue}
                    </p>
                  )}
                </div>

                <Link
                  href={`/teams/${match.awayTeam._id}`}
                  className="group flex flex-col items-center gap-3 text-center md:flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <TeamCrest team={match.awayTeam} size={88} />
                  <p
                    className="font-display truncate max-w-[16rem] text-xl font-bold uppercase tracking-wide text-foreground transition-colors group-hover:text-gold sm:text-2xl"
                    title={match.awayTeam.name}
                  >
                    {match.awayTeam.name}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Visitante
                  </span>
                </Link>
              </div>
            </Container>
          </section>

          {/* Compact editorial meta */}
          <Container className="py-10">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
                {formatDate(match.date)}
              </p>
              <span className="size-1 rounded-full bg-border" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {match.time}
              </p>
              {match.round && (
                <>
                  <span className="size-1 rounded-full bg-border" aria-hidden="true" />
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {match.round}
                  </p>
                </>
              )}
              <span className="size-1 rounded-full bg-border" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {match.venue ?? "Sede por confirmar"}
              </p>
              <span className="size-1 rounded-full bg-border" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                {match.status === "live"
                  ? "En vivo"
                  : match.status === "finished"
                    ? "Finalizado"
                    : "Próximo"}
              </p>
            </div>

            {played && (
              <section className="mt-10">
                <SubHeading label="Goles y eventos" />
                {isEventsLoading ? (
                  <div className="divide-y divide-border/60">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-3 py-3.5">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="ml-auto size-5 rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : isEventsError ? (
                  <p className="text-sm text-muted-foreground">
                    No se pudieron cargar los eventos del partido.
                  </p>
                ) : events.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Aún no hay goles cargados para este partido.
                  </p>
                ) : (
                  <MatchTimeline
                    events={events}
                    halftime={halftime}
                    homeTeamId={match.homeTeam._id}
                    awayTeamId={match.awayTeam._id}
                  />
                )}
              </section>
            )}

            {played && (
              <section className="mt-12">
                <SubHeading label="Estadísticas del partido" />
                {isStatsLoading ? (
                  <div className="grid gap-5 sm:grid-cols-3 sm:gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex flex-col gap-1.5">
                        <Skeleton className="h-2.5 w-14" />
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-3.5 w-5" />
                          <Skeleton className="h-0.5 flex-1" />
                          <Skeleton className="h-3.5 w-5" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isStatsError || !stats ? (
                  <p className="text-sm text-muted-foreground">
                    Aún no hay estadísticas cargadas para este partido.
                  </p>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-3 sm:gap-8">
                    <MatchStatBars
                      label="Posesión"
                      stats={[stats.home.possession, stats.away.possession]}
                      homeColor={match.homeTeam.color}
                      awayColor={match.awayTeam.color}
                      index={0}
                    />
                    <MatchStatBars
                      label="Remates"
                      stats={[stats.home.shots, stats.away.shots]}
                      homeColor={match.homeTeam.color}
                      awayColor={match.awayTeam.color}
                      index={1}
                    />
                    <MatchStatBars
                      label="Al arco"
                      stats={[stats.home.shotsOnTarget, stats.away.shotsOnTarget]}
                      homeColor={match.homeTeam.color}
                      awayColor={match.awayTeam.color}
                      index={2}
                    />
                  </div>
                )}
              </section>
            )}

            <section className="mt-12">
              <SubHeading label="Contexto del torneo" />
              {standingsLoading || allMatchesLoading ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Skeleton className="h-52 w-full" />
                  <Skeleton className="h-52 w-full" />
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  <TeamContextBlock
                    team={match.homeTeam}
                    standing={homeStanding}
                    form={homeForm}
                    next={homeNext}
                  />
                  <TeamContextBlock
                    team={match.awayTeam}
                    standing={awayStanding}
                    form={awayForm}
                    next={awayNext}
                  />
                </div>
              )}
              <div className="mt-5 flex justify-center">
                <Link
                  href="/standings"
                  className="inline-flex items-center gap-1.5 rounded-sm text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Ver tabla completa
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <section className="mt-12">
              <SubHeading label="Próximos partidos" />
              {allMatchesLoading ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-40 w-full" />
                </div>
              ) : upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay próximos partidos cargados.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {upcoming.map((m) => (
                    <MatchCard
                      key={m._id}
                      match={m}
                      href={`/matches/${m._id}`}
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