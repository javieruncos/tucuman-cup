import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TournamentIdentity } from "@/components/tournament/TournamentIdentity";
import { TickerBar } from "@/components/home/TickerBar";
import { MatchCenter } from "@/components/home/MatchCenter";
import { UpcomingMatches } from "@/components/home/UpcomingMatches";
import { NewsFeed } from "@/components/news/NewsFeed";
import { StatsSection } from "@/components/home/StatsSection";
import { TeamsSection } from "@/components/home/TeamsSection";
import { SponsorsSection } from "@/components/sponsors/SponsorsSection";

export default function Home() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          image="/images/futbolTribuna.jfif"
          eyebrow="Tucumán Cup"
          title={
            <>
              La competición de fútbol de <span className="text-gold">Tucumán</span>
            </>
          }
          description="Fútbol, partidos y clasificación de la temporada: toda la competición en un solo lugar."
        >
          <TournamentIdentity />
        </PageHero>
        <TickerBar />
        <MatchCenter />
        <NewsFeed />
        <UpcomingMatches />
        <StatsSection />
        <TeamsSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  );
}