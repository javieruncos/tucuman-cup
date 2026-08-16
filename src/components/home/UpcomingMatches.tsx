"use client";

import { ArrowRight } from "lucide-react";

import { MatchCard } from "@/components/matches/MatchCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useMatches } from "@/hooks/useMatches";

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

  return (
    <Section id="partidos">
      <Container>
        <SectionHeader
          eyebrow="Agenda"
          title="Próximos partidos"
          align="left"
          action={
            <a
              href="/fixtures"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Ver fixture completo
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingMatches.slice(0, 6).map((match) => (
            <MatchCard key={match._id} match={match} href={`/matches/${match._id}`} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
