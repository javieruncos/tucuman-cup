import { Footer } from "@/components/ui/Footer";
import { PortalNavbar } from "@/components/home/PortalNavbar";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { TopScorersWidget } from "@/components/statistics/TopScorersWidget";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { standings, topScorers, tournamentInfo } from "@/lib/mock/portal";

export default function StatsPage() {
  const assistLeaders = [...topScorers]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 6);
  const goalsByTeam = [...standings].sort((a, b) => b.gf - a.gf);
  const maxGf = goalsByTeam[0].gf;

  const statCards: Array<[string, number]> = [
    ["Goles", tournamentInfo.goalsScored],
    ["Partidos", tournamentInfo.matchesPlayed],
    ["Goles por partido", tournamentInfo.avgGoals],
    ["Clubes", tournamentInfo.teamsCount],
  ];

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
          <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statCards.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card px-5 py-4"
              >
                <p className="tabular font-display text-3xl font-bold text-gold">
                  {value}
                </p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>

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
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-col gap-3">
                {goalsByTeam.map((row) => (
                  <div key={row.id} className="flex items-center gap-3">
                    <div className="flex w-32 shrink-0 items-center gap-2 sm:w-44">
                      <TeamCrest team={row.team} size={24} />
                      <span className="truncate text-sm font-medium">
                        {row.team.name}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div
                        className="h-6 rounded bg-gradient-to-r from-gold/70 to-gold transition-all"
                        style={{ width: `${(row.gf / maxGf) * 100}%` }}
                      />
                    </div>
                    <span className="tabular font-display w-8 text-right text-sm font-bold">
                      {row.gf}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
