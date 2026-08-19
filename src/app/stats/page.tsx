import { PortalNavbar } from "@/components/home/PortalNavbar";
import { GoalsByClub } from "@/components/statistics/GoalsByClub";
import { StatsSummaryCards } from "@/components/statistics/StatsSummaryCards";
import { TopScorersWidget } from "@/components/statistics/TopScorersWidget";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function StatsPage() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Números"
          title="Centro de estadísticas"
          description="La radiografía estadística de la Tucumán Cup — goleadores y los clubes que iluminan el marcador."
          image="/images/estadisticas.jfif"
        />
        <Container className="py-10">
          <StatsSummaryCards />

          <div className="mt-12">
            <SectionHeader eyebrow="Bota de oro" title="Goleadores" align="left" />
            <TopScorersWidget />
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