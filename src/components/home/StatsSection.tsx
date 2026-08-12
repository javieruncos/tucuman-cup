import { ArrowRight } from "lucide-react";

import { StandingsWidget } from "@/components/statistics/StandingsWidget";
import { TopScorersWidget } from "@/components/statistics/TopScorersWidget";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function StatsSection() {
  return (
    <Section id="estadisticas">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Tabla"
              title="Posiciones"
              align="left"
              action={
                <a
                  href="#estadisticas"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                >
                  Ver completa
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              }
            />
            <StandingsWidget  />
          </div>
          <div className="min-w-0">
            <SectionHeader
              eyebrow="Bota de oro"
              title="Goleadores"
              align="left"
              action={
                <a
                  href="#estadisticas"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                >
                  Ver ranking
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              }
            />
            <TopScorersWidget />
          </div>
        </div>
      </Container>
    </Section>
  );
}
