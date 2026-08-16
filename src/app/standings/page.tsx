import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { StandingsHighlights } from "@/components/statistics/StandingsHighlights";
import { StandingsWidget } from "@/components/statistics/StandingsWidget";
import { StatsSummaryCards } from "@/components/statistics/StatsSummaryCards";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function StandingsPage() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="La tabla"
          title="La clasificación"
          description="La clasificación actual de la Tucumán Cup. Los cuatro primeros avanzan a semifinales; los dos últimos juegan los play-offs de descenso."
          image="/images/fixture.jfif"
        />
        <Container className="py-10">
          <StatsSummaryCards />
          <StandingsHighlights />
          <SectionHeader
            eyebrow="Clasificación"
            title="Tabla de posiciones"
            align="left"
          />
          <StandingsWidget />
          <div className="mt-12 flex justify-center">
            <Link
              href="/fixtures"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              Ver partidos
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}