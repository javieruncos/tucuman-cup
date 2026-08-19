"use client";

import Link from "next/link";
import { Fragment, use, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchDetailSkeleton } from "@/components/matches/MatchDetailSkeleton";
import { MatchStatBars } from "@/components/matches/MatchStatBars";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatch } from "@/hooks/useMatch";
import { useMatchEvents } from "@/hooks/useMatchEvents";
import { useMatchStats } from "@/hooks/useMatchStats";
import { useTournament } from "@/hooks/useTournament";
import type { MatchEventResponseType } from "@/types/matchEvents";
import type { MatchStatus } from "@/types/matches";

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

function InfoCell({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="bg-card p-5">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className="font-display mt-2 text-lg font-semibold uppercase text-foreground">
        {value}
      </div>
    </div>
  );
}

function EventRow({ event }: { event: MatchEventResponseType }) {
  const minute = `${event.minute}'`;

  if (event.type === "goal") {
    return (
      <li className="grid grid-cols-[3.5rem_1fr] items-center gap-3 py-3.5">
        <span className="tabular font-display text-sm font-bold text-gold">
          {minute}
        </span>
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">
            Gol
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {event.player.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {event.team.shortName}
          </span>
          <TeamCrest team={event.team} size={20} className="ml-auto shrink-0" />
        </div>
      </li>
    );
  }

  if (event.type === "yellow_card" || event.type === "red_card") {
    const isRed = event.type === "red_card";
    return (
      <li className="grid grid-cols-[3.5rem_1fr] items-center gap-3 py-3.5">
        <span className="tabular font-display text-sm font-bold text-gold">
          {minute}
        </span>
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={isRed ? "size-2.5 rounded-sm bg-destructive" : "size-2.5 rounded-sm bg-warning"}
            aria-hidden="true"
          />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {isRed ? "Roja" : "Amarilla"}
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {event.player.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {event.team.shortName}
          </span>
          <TeamCrest team={event.team} size={20} className="ml-auto shrink-0" />
        </div>
      </li>
    );
  }

  return (
    <li className="grid grid-cols-[3.5rem_1fr] items-center gap-3 py-3.5">
      <span className="tabular font-display text-sm font-bold text-gold">
        {minute}
      </span>
      <div className="flex min-w-0 flex-wrap items-center gap-2.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Cambio
        </span>
        <span className="text-sm font-medium text-foreground">
          {event.player.name}
        </span>
        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">
          {event.additionalPlayer?.name ?? "—"}
        </span>
        <TeamCrest team={event.team} size={20} className="ml-auto shrink-0" />
      </div>
    </li>
  );
}

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: match, isLoading, error } = useMatch(id);
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
              <Link
                href="/fixtures"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Volver al fixture
              </Link>

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
                <div className="flex flex-col items-center gap-3 text-center md:flex-1">
                  <TeamCrest team={match.homeTeam} size={88} />
                  <p className="font-display truncate max-w-[16rem] text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
                    {match.homeTeam.name}
                  </p>
                </div>

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

                <div className="flex flex-col items-center gap-3 text-center md:flex-1">
                  <TeamCrest team={match.awayTeam} size={88} />
                  <p className="font-display truncate max-w-[16rem] text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
                    {match.awayTeam.name}
                  </p>
                </div>
              </div>
            </Container>
          </section>

          {/* Match information */}
          <Container className="py-10">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
              <InfoCell label="Fecha" value={formatDate(match.date)} />
              <InfoCell label="Hora" value={match.time} />
              <InfoCell label="Jornada" value={match.round ?? "—"} />
              <InfoCell label="Estadio" value={match.venue ?? "—"} />
              <InfoCell
                label="Estado"
                value={
                  match.status === "live"
                    ? "En vivo"
                    : match.status === "finished"
                      ? "Finalizado"
                      : "Próximo"
                }
              />
              <InfoCell
                label="Competición"
                value={
                  tournament ? `${tournament.name} · ${tournament.season}` : "—"
                }
              />
            </div>

            {played && (
              <section className="mt-12">
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
                  <ol className="divide-y divide-border/60">
                    {events.map((event) => {
                      const showHalftime =
                        halftime !== null && event.minute > 45;
                      return (
                        <Fragment key={event._id}>
                          {showHalftime && (
                            <li className="flex items-center gap-3 py-3.5">
                              <span className="tabular font-display text-sm font-bold text-muted-foreground/60">
                                {`45'`}
                              </span>
                              <span className="h-px flex-1 bg-border/60" aria-hidden="true" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                Fin del primer tiempo
                              </span>
                            </li>
                          )}
                          <EventRow event={event} />
                        </Fragment>
                      );
                    })}
                  </ol>
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
          </Container>
        </main>
      )}
      <Footer />
    </>
  );
}