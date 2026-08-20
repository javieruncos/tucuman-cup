"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useMatches } from "@/hooks/useMatches";
import { formatMatchDay } from "@/lib/matchDate";
import type { MatchResponseType } from "@/types/matches";
import type { Team } from "@/types/teams";

function TeamSide({ team }: { team: Team }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-3 text-center">
      <TeamCrest
        team={team}
        size={64}
        className="sm:hidden transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <TeamCrest
        team={team}
        size={80}
        className="hidden sm:inline-flex transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <p className="font-display line-clamp-2 min-h-[2.25rem] text-sm font-semibold uppercase leading-tight tracking-wide text-foreground sm:min-h-[2.5rem] sm:text-base">
        {team.name}
      </p>
    </div>
  );
}

function EditorialMatchCard({ match }: { match: MatchResponseType }) {
  const { weekday, dayMonth } = formatMatchDay(match.date);

  return (
    <Link
      href={`/matches/${match._id}`}
      className="group flex flex-col gap-5 rounded-xl border border-border/50 bg-card p-6 transition-colors duration-300 hover:border-gold/40 hover:bg-elevated sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {weekday}
          </p>
          <p className="font-display mt-1 text-lg font-semibold uppercase leading-none tracking-wide text-foreground">
            {dayMonth}
          </p>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {match.status === "scheduled" ? "Próximo" : match.status}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center py-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <TeamSide team={match.homeTeam} />
          <span
            className="font-display shrink-0 text-xs font-semibold tracking-widest text-muted-foreground/50"
            aria-hidden="true"
          >
            VS
          </span>
          <TeamSide team={match.awayTeam} />
        </div>
      </div>

      <p className="text-center text-sm font-medium text-foreground/90 sm:text-base">
        {match.time} HS
      </p>

      <div className="flex items-center justify-center gap-1.5 border-t border-border/30 pt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-gold">
        Ver partido
        <ArrowRight
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

export function UpcomingMatches() {
  const { data: matches = [], isLoading, error } = useMatches();

  if (isLoading) {
    return <div>Cargando partidos...</div>;
  }

  if (error) {
    return <div>Error al cargar los partidos</div>;
  }

  const upcomingMatches = matches.filter(
    (match) => match.status === "scheduled"
  );

  if (upcomingMatches.length === 0) {
    return null;
  }

  return (
    <Section id="partidos">
      <Container>
        <SectionHeader
          eyebrow="Agenda"
          title="Próximos partidos"
          align="left"
          action={
            <Link
              href="/fixtures"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Ver fixture completo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {upcomingMatches.slice(0, 3).map((match) => (
            <EditorialMatchCard key={match._id} match={match} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
