import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchCard } from "@/components/matches/MatchCard";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Tabs } from "@/components/ui/tabs";
import { matches, type Match } from "@/lib/mock/portal";

function Grid({ list }: { list: Match[] }) {
  if (list.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/40 py-16 text-center">
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
          No hay partidos aquí
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Vuelve más cerca de la fecha.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((m) => (
        <MatchCard key={m.id} match={m} href={`/match/${m.id}`} />
      ))}
    </div>
  );
}

export default function FixturesPage() {
  const live = matches.filter((m) => m.status === "live");
  const upcoming = matches.filter((m) => m.status === "scheduled");
  const results = matches.filter((m) => m.status === "finished");

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Calendario"
          title="Fixture y Resultados"
          description="Todos los partidos de la Tucumán Cup — en vivo ahora, los próximos y el historial completo de resultados de la temporada."
        />
        <Container className="py-10">
          <Tabs
            tabs={[
              { id: "all", label: "Todos", content: <Grid list={matches} /> },
              {
                id: "live",
                label: `En vivo (${live.length})`,
                content: <Grid list={live} />,
              },
              { id: "upcoming", label: "Próximos", content: <Grid list={upcoming} /> },
              { id: "results", label: "Resultados", content: <Grid list={results} /> },
            ]}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
