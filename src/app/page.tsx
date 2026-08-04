import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TickerBar } from "@/components/home/TickerBar";
import { MatchCenter } from "@/components/home/MatchCenter";
import { UpcomingMatches } from "@/components/home/UpcomingMatches";
import { EditorialGrid } from "@/components/home/EditorialGrid";

export default function Home() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-1 pt-16">
        <TickerBar />
        <MatchCenter />
        <UpcomingMatches />
        <EditorialGrid />
      </main>
    </>
  );
}