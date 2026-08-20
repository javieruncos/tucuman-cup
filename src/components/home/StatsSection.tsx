"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useStandings } from "@/hooks/useStandings";
import { useTopScorers } from "@/hooks/useTopScorers";
import { cn } from "@/lib/utils";
import type { Standing } from "@/types/standings";
import type { TopScorer } from "@/types/statistics";

function BlockHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display border-b border-border/40 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </p>
  );
}

function BlockLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
    >
      {children}
      <ArrowRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

function formatGoalDifference(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

function StandingRow({ row }: { row: Standing }) {
  const isLeader = row.position === 1;

  return (
    <div className="relative pl-4 sm:pl-5">
      {isLeader && (
        <span
          className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-gold"
          aria-hidden="true"
        />
      )}
      <div className="grid min-h-16 grid-cols-[1.75rem_1fr_auto] items-center gap-3 py-3.5 sm:min-h-[4.5rem] sm:py-4">
        <span
          className={cn(
            "tabular font-display text-sm font-semibold",
            isLeader ? "text-gold" : "text-muted-foreground"
          )}
        >
          {String(row.position).padStart(2, "0")}
        </span>
        <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <TeamCrest team={row.team} size={28} />
          <span
            className={cn(
              "font-display truncate text-sm font-semibold uppercase tracking-wide",
              isLeader ? "text-gold" : "text-foreground"
            )}
          >
            {row.team.name}
          </span>
        </span>
        <span className="flex items-center justify-end gap-3 sm:gap-5">
          <span className="tabular font-display text-xs font-semibold text-muted-foreground">
            {row.played} PJ
          </span>
          <span className="tabular hidden font-display text-xs font-semibold text-muted-foreground sm:block">
            {formatGoalDifference(row.goalDifference)} DG
          </span>
          <span className="tabular font-display text-lg font-bold text-gold">
            {row.points}
          </span>
        </span>
      </div>
    </div>
  );
}

function StandingsTeaser() {
  const {
    data: standings = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useStandings();

  if (isLoading || (isFetching && standings.length === 0)) {
    return (
      <div className="flex flex-1 flex-col divide-y divide-border/40">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex min-h-16 items-center gap-3 py-3.5 sm:min-h-[4.5rem] sm:py-4">
            <Skeleton className="h-4 w-7" />
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col justify-center py-6">
        <p className="text-sm text-muted-foreground">
          No se pudo cargar la clasificación.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-sm font-medium text-gold transition-colors hover:text-gold-muted"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <p className="py-6 text-sm text-muted-foreground">
        No hay posiciones disponibles.
      </p>
    );
  }

  return (
    <div className="flex flex-1 flex-col divide-y divide-border/40">
      {standings.slice(0, 5).map((row) => (
        <StandingRow key={row._id} row={row} />
      ))}
    </div>
  );
}

function ScorerRow({ scorer, rank }: { scorer: TopScorer; rank: number }) {
  return (
    <div className="grid min-h-16 grid-cols-[1.75rem_1fr_auto] items-center gap-3 py-3.5 sm:min-h-[4.5rem] sm:py-4">
      <span className="tabular font-display text-sm font-semibold text-muted-foreground">
        {String(rank).padStart(2, "0")}
      </span>
      <span className="flex min-w-0 items-center gap-3">
        <TeamCrest team={scorer.team} size={24} />
        <span className="min-w-0">
          <span className="font-display block truncate text-sm font-semibold uppercase tracking-wide text-foreground">
            {scorer.player.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {scorer.team.shortName}
          </span>
        </span>
      </span>
      <span className="tabular font-display text-2xl font-bold text-gold sm:text-3xl">
        {scorer.goals}
      </span>
    </div>
  );
}

function ScorersTeaser() {
  const {
    data: scorers = [],
    isLoading,
    isError,
    refetch,
  } = useTopScorers();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col divide-y divide-border/40">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-16 items-center gap-3 py-3.5 sm:min-h-[4.5rem] sm:py-4"
          >
            <Skeleton className="h-4 w-7" />
            <Skeleton className="size-6 rounded-full" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-1.5 h-3 w-16" />
            </div>
            <Skeleton className="h-6 w-10" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col justify-center py-6">
        <p className="text-sm text-muted-foreground">
          No se pudo cargar la tabla de goleadores.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-sm font-medium text-gold transition-colors hover:text-gold-muted"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (scorers.length === 0) {
    return (
      <p className="py-6 text-sm text-muted-foreground">
        No hay goleadores cargados.
      </p>
    );
  }

  return (
    <div className="flex flex-1 flex-col divide-y divide-border/40">
      {scorers.slice(0, 5).map((scorer, index) => (
        <ScorerRow key={scorer.player._id} scorer={scorer} rank={index + 1} />
      ))}
    </div>
  );
}

export function StatsSection() {
  return (
    <Section id="estadisticas">
      <Container>
        <SectionHeader
          eyebrow="Tucumán Cup · 2026"
          title="Números del torneo"
          align="left"
        />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-w-0 flex-col">
            <BlockHeader>Clasificación</BlockHeader>
            <StandingsTeaser />
            <BlockLink href="/standings">Ver clasificación</BlockLink>
          </div>
          <div className="flex min-w-0 flex-col">
            <BlockHeader>Goleadores</BlockHeader>
            <ScorersTeaser />
            <BlockLink href="/stats">Ver estadísticas</BlockLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}