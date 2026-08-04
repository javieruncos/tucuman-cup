import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TournamentStats } from "@/components/landing/TournamentStats";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturedTournament } from "@/components/landing/FeaturedTournament";
import { CallToAction } from "@/components/landing/CallToAction";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <TournamentStats />
        <FeaturesSection />
        <HowItWorksSection />
        <FeaturedTournament />
        <CallToAction />
      </main>
      <LandingFooter />
    </>
  );
}