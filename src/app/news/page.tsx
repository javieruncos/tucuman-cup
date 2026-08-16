"use client";

import type { ReactNode } from "react";

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
import { useMatches } from "@/hooks/useMatches";
import { useNews } from "@/hooks/useNews";
import type { NewsResponseType } from "@/types/news";

function NewsGrid({ list }: { list: NewsResponseType[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((a) => (
        <NewsCard key={a._id} article={a} href={`/news/${a._id}`} />
      ))}
    </div>
  );
}

function NewsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex h-32 gap-4 rounded-lg border border-border bg-card p-4"
        >
          <div className="h-20 w-24 shrink-0 animate-pulse rounded-md bg-muted" />
          <div className="min-w-0 flex-1 space-y-2 py-1">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NewsMessage({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export default function NewsPage() {
  const { data: news = [], isLoading, isError } = useNews();
  const featured = news[0];
  const trending = news.slice(1, 5);
  const { data: matches = [], isLoading: isLoadingMatches, error } = useMatches();
  const upcoming = matches.filter((match) => match.status === "scheduled");

  const categories = [
    "Todos",
    ...Array.from(new Set(news.map((a) => a.category))),
  ];

  return (
    <>
      <PortalNavbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Editorial"
          title="Noticias Destacadas"
          description="Toda la actualidad de la Tucumán Cup — resultados, entrevistas, mercado de pases y las historias detrás del torneo."
          image="/images/noticias.jfif"
        />
        <Container className="py-10">
          {isLoading ? (
            <>
              <div className="flex min-h-[380px] flex-col justify-end rounded-xl border border-border bg-card p-6 sm:p-8">
                <div className="space-y-3">
                  <span className="h-4 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-7 w-1/2 animate-pulse rounded bg-muted" />
                  <p className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                  <p className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
              <section className="mt-12">
                <SectionHeader
                  eyebrow="Actualidad"
                  title="Últimas noticias"
                  align="left"
                />
                <NewsGridSkeleton />
              </section>
            </>
          ) : isError ? (
            <NewsMessage>No se pudieron cargar las noticias.</NewsMessage>
          ) : !featured ? (
            <NewsMessage>
              No hay noticias disponibles por el momento.
            </NewsMessage>
          ) : (
            <>
              <NewsCard article={featured} variant="feature" href={`/news/${featured._id}`} />

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
                      key={a._id}
                      article={a}
                      variant="compact"
                      href={`/news/${a._id}`}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

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
                {isLoadingMatches ? (
                  <div>Cargando agenda...</div>
                ) : error ? (
                  <div>No se pudo cargar la agenda</div>
                ) : (
                  upcoming.map((match) => (
                    <MatchCard
                      key={match._id}
                      match={match}
                      href={`/matches/${match._id}`}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}