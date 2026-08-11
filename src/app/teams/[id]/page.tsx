"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchCard } from "@/components/matches/MatchCard";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  portalTeams,
  standings,
  upcomingMatches,
  recentResults,
} from "@/lib/mock/portal";
import { cn } from "@/lib/utils";
import { useTeam } from "@/hooks/useTeam";
import { use } from "react";

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

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: team, isLoading, error } = useTeam(id);

  if (isLoading) {
    return <div>Cargando equipo...</div>;
  }

  if (error || !team) {
    return <div>Equipo no encontrado</div>;
  }


  return (
    <>
      <PortalNavbar />
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
                  {/* {standing && (
                    <span className="font-semibold text-foreground">
                      #{standing.position} en la tabla
                    </span>
                  )} */}
                  <FormTiles form={team.form} />
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
                {/* {standing ? `#${standing.position}` : "—"} */}
              </p>
            </div>
            <div className="bg-card p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Forma
              </p>
              <div className="mt-3">
                <FormTiles form={team.form} />
              </div>
            </div>
          </div>

          <section className="mt-12">
            <SectionHeader align="left" eyebrow="Números" title="Estadísticas" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              <div className="rounded-xl border border-gold/40 bg-card p-5 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Puntos
                </p>
                <p className="font-display mt-2 text-3xl font-bold tabular-nums text-gold">
                  {/* {standing?.points ?? 0} */}
                </p>
              </div>
              {/* {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-card p-5 text-center"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="font-display mt-2 text-3xl font-bold tabular-nums text-foreground">
                    {s.value}
                  </p>
                </div>
              ))} */}
            </div>
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
            {/* {upcoming.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {upcoming.map((m) => (
                  <MatchCard key={m.id} match={m} href={`/match/${m.id}`} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
                <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                  Sin partidos próximos
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Vuelve más cerca de la fecha.
                </p>
              </div>
            )} */}
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
            {/* {recent.length > 0 ? (
              <ul className="overflow-hidden rounded-xl border border-border bg-card">
                {recent.map((m) => {
                  const homeScore = m.homeScore ?? 0;
                  const awayScore = m.awayScore ?? 0;
                  const homeWon = homeScore > awayScore;
                  const awayWon = awayScore > homeScore;
                  const isDraw = homeScore === awayScore;
                  return (
                    <li
                      key={m.id}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-elevated",
                        "[&+li]:border-t [&+li]:border-border/60"
                      )}
                    >
                      <span className="w-16 shrink-0 text-[11px] font-medium text-muted-foreground">
                        {m.date}
                      </span>
                      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                        <span
                          className={cn(
                            "truncate text-xs",
                            homeWon
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {m.home.shortName}
                        </span>
                        <TeamCrest team={m.home} size="md" />
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2.5 py-1 font-heading text-xs font-bold tabular-nums",
                            isDraw
                              ? "bg-surface-2 text-muted-foreground"
                              : "bg-primary text-primary-foreground"
                          )}
                        >
                          {homeScore}–{awayScore}
                        </span>
                        <TeamCrest team={m.away} size="md" />
                        <span
                          className={cn(
                            "truncate text-xs",
                            awayWon
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {m.away.shortName}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
                <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                  Sin resultados aún
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  El historial se completará con los próximos partidos.
                </p>
              </div>
            )} */}
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
