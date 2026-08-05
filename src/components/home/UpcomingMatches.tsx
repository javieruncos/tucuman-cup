import { ArrowRight } from "lucide-react";

import { MatchCard } from "@/components/matches/MatchCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { upcomingMatches } from "@/lib/mock/portal";

export function UpcomingMatches() {
  return (
    <Section id="partidos">
      <Container>
        <SectionHeader
          eyebrow="Agenda"
          title="Próximos partidos"
          align="left"
          action={
            <a
              href="#partidos"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Ver fixture completo
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} href="#partidos" />
          ))}
        </div>
      </Container>
    </Section>
  );
}
