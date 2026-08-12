import { Footer } from "@/components/ui/Footer";
import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TeamCard } from "@/components/teams/TeamCard";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { portalTeams } from "@/lib/mock/portal";
import { TeamsList } from "../../components/teams/TeamsList";

export default function TeamsPage() {
  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Los clubes"
          title="Equipos"
          description="Los clubes de la provincia, cada uno con su historia, colores y ambición, compitiendo por la Tucumán Cup."
        />
        <Container className="py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <TeamsList></TeamsList>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
