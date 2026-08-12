import { PortalNavbar } from "@/components/home/PortalNavbar";
import { MatchCard } from "@/components/matches/MatchCard";
import { ResultsWidget } from "@/components/matches/ResultsWidget";
import { NewsCard } from "@/components/news/NewsCard";
import { TopScorersWidget } from "@/components/statistics/TopScorersWidget";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/tabs";
import { news, upcomingMatches, type NewsItem } from "@/lib/mock/portal";

const categories = [
  "Todos",
  "Transferencias",
  "Partidos",
  "Entrevistas",
  "Equipos",
  "Jugadores",
] as const;

function NewsGrid({ list }: { list: NewsItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((a) => (
        <NewsCard key={a.id} article={a} href={`/news/${a.id}`} />
      ))}
    </div>
  );
}

export default function NewsPage() {
  const featured = news[0];
  const trending = news.filter((a) =>
    ["n5", "n4", "n7", "n6"].includes(a.id)
  );

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Editorial"
          title="Noticias"
          description="Toda la actualidad de la Tucumán Cup — resultados, entrevistas, mercado de pases y las historias detrás del torneo."
        />
        <Container className="py-10">
          <NewsCard article={featured} variant="feature" href={`/news/${featured.id}`} />

          <section className="mt-12">
            <SectionHeader
              eyebrow="Actualidad"
              title="Últimas noticias"
              align="left"
            />
            <Tabs
              tabs={[
                {
                  id: "all",
                  label: "Todos",
                  content: <NewsGrid list={news} />,
                },
                ...categories
                  .filter((c) => c !== "Todos")
                  .map((c) => ({
                    id: c,
                    label: c,
                    content: (
                      <NewsGrid list={news.filter((a) => a.category === c)} />
                    ),
                  })),
              ]}
            />
          </section>

          <section className="mt-12">
            <SectionHeader
              eyebrow="Trending"
              title="Destacadas"
              align="left"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {trending.map((a) => (
                <NewsCard
                  key={a.id}
                  article={a}
                  variant="compact"
                  href={`/news/${a.id}`}
                />
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionHeader
              eyebrow="Panorama"
              title="Resultados, goleadores y agenda"
              align="left"
            />
            <div className="grid gap-8 lg:grid-cols-3">
              <ResultsWidget />
              <TopScorersWidget />
              <div className="flex flex-col gap-4">
                {upcomingMatches.map((m) => (
                  <MatchCard key={m.id} match={m} href={`/match/${m.id}`} />
                ))}
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
