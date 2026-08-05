import { ArrowRight } from "lucide-react";

import { TeamCard } from "@/components/teams/TeamCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { portalTeams } from "@/lib/mock/portal";

export function TeamsSection() {
  return (
    <Section id="equipos">
      <Container>
        <SectionHeader
          eyebrow="Tournament"
          title="Equipos participantes"
          align="left"
          action={
            <a
              href="#equipos"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Ver todos
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portalTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
