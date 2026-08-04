import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NewsFeed } from "@/components/news/NewsFeed";
import { ResultsWidget } from "@/components/matches/ResultsWidget";
import { StandingsWidget } from "@/components/statistics/StandingsWidget";
import { TopScorersWidget } from "@/components/statistics/TopScorersWidget";

export function EditorialGrid() {
  return (
    <Section id="noticias">
      <Container>
        <SectionHeader
          eyebrow="Cobertura"
          title="Lo último del torneo"
          align="left"
        />
        <div className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <NewsFeed />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5">
            <StandingsWidget />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <TopScorersWidget />
              <ResultsWidget />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}