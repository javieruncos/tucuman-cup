import { PortalNavbar } from "@/components/home/PortalNavbar";
import { StandingsWidget } from "@/components/statistics/StandingsWidget";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { standings } from "@/lib/mock/portal";

export default function StandingsPage() {
  const leader = standings[0];
  const topScorerTeam = standings.reduce((a, b) => (a.gf > b.gf ? a : b));
  const bestDefense = standings.reduce((a, b) => (a.ga < b.ga ? a : b));

  const highlights: Array<[string, string, string]> = [
    ["Líder", leader.team.name, `${leader.points} pts`],
    ["Más goles", topScorerTeam.team.name, `${topScorerTeam.gf} anotados`],
    ["Mejor defensa", bestDefense.team.name, `${bestDefense.ga} recibidos`],
  ];

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
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {highlights.map(([label, name, sub]) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
                  {label}
                </p>
                <p className="font-display mt-2 text-xl font-semibold uppercase tracking-wide">
                  {name}
                </p>
                <p className="text-sm text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
          <StandingsWidget />
        </Container>
      </main>
      <Footer />
    </>
  );
}
