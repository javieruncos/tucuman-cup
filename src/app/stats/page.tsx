import { Footer } from "@/components/ui/Footer";
import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { GoalsByClub } from "@/components/statistics/GoalsByClub";
import { StatsSummaryCards } from "@/components/statistics/StatsSummaryCards";
import { TopScorersWidget } from "@/components/statistics/TopScorersWidget";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { topScorers } from "@/lib/mock/portal";

export default function StatsPage() {
  const assistLeaders = [...topScorers]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 6);

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Números"
          title="Centro de estadísticas"
          description="La radiografía estadística de la Tucumán Cup — goleadores, creadores y los clubes que iluminan el marcador."
        />
        <Container className="py-10">
          <StatsSummaryCards />

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Bota de oro" title="Goleadores" align="left" />
              <TopScorersWidget />
            </div>
            <div>
              <SectionHeader eyebrow="Creadores" title="Asistidores" align="left" />
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                {assistLeaders.map((scorer, index) => (
                  <div
                    key={scorer.id}
                    className="flex items-center gap-4 border-b border-border/60 px-4 py-3.5 last:border-0"
                  >
                    <span className="tabular font-display w-6 text-center text-sm font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    <TeamCrest team={scorer.team} size={30} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{scorer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {scorer.team.shortName}
                      </p>
                    </div>
                    <p className="tabular font-display text-xl font-bold text-gold">
                      {scorer.assists}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader
              eyebrow="Potencia ofensiva"
              title="Goles por club"
              align="left"
            />
            <GoalsByClub />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
