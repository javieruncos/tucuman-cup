import { PortalNavbar } from "@/components/home/PortalNavbar";
import { StandingsHighlights } from "@/components/statistics/StandingsHighlights";
import { StandingsWidget } from "@/components/statistics/StandingsWidget";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";

export default function StandingsPage() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="La tabla"
          title="Tabla de posiciones"
          description="La clasificación actual de la Tucumán Cup. Los cuatro primeros avanzan a semifinales; los dos últimos juegan los play-offs de descenso."
        />
        <Container className="py-10">
          <StandingsHighlights />
          <StandingsWidget />
        </Container>
      </main>
      <Footer />
    </>
  );
}
