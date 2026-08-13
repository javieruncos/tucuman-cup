"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchDetailSkeleton } from "@/components/matches/MatchDetailSkeleton";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { useMatch } from "@/hooks/useMatch";
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

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: match, isLoading, error } = useMatch(id);

  const played = match?.status === "live" || match?.status === "finished";

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
                <div className="flex items-center gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                    {formatDate(match.date)}
                  </p>
                  <span className="size-1 rounded-full bg-border" aria-hidden="true" />
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {match.time}
                  </p>
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
              <div className="bg-card p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Fecha
                </p>
                <p className="font-display mt-2 text-lg font-semibold uppercase text-foreground">
                  {formatDate(match.date)}
                </p>
              </div>
              <div className="bg-card p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Hora
                </p>
                <p className="font-display mt-2 text-lg font-semibold uppercase text-foreground">
                  {match.time}
                </p>
              </div>
              <div className="col-span-2 bg-card p-5 md:col-span-1">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Estado
                </p>
                <p className="font-display mt-2 text-lg font-semibold uppercase text-foreground">
                  {match.status === "live"
                    ? "En vivo"
                    : match.status === "finished"
                      ? "Finalizado"
                      : "Próximo"}
                </p>
              </div>
            </div>
          </Container>
        </main>
      )}
      <Footer />
    </>
  );
}
