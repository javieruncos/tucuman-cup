import { Footer } from "@/components/ui/Footer";
import { PortalNavbar } from "@/components/home/PortalNavbar";
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
        <TickerBar />
        <MatchCenter />
        <UpcomingMatches />
        <NewsFeed />
        <StatsSection />
        <TeamsSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  );
}