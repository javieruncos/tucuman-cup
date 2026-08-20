import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamsList } from "../teams/TeamsList";

export function TeamsSection() {
  return (
    <Section id="equipos">
      <Container>
        <SectionHeader
          eyebrow="Participantes"
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
          <TeamsList></TeamsList>
        </div>
      </Container>
    </Section>
  );
}
