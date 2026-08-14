"use client";

import Link from "next/link";
import { use, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { PortalNavbar } from "@/components/home/PortalNavbar";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsDetailSkeleton } from "@/components/news/NewsDetailSkeleton";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/ui/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/useNews";
import { useNewsById } from "@/hooks/useNewsById";
import type { NewsResponseType } from "@/types/news";

function formatFullDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function MoreNewsGrid({ list }: { list: NewsResponseType[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((a) => (
        <NewsCard key={a._id} article={a} href={`/news/${a._id}`} />
      ))}
    </div>
  );
}

function MoreNewsMessage({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: article, isLoading, error } = useNewsById(id);
  const {
    data: allNews = [],
    isLoading: moreNewsLoading,
    isError: moreNewsError,
  } = useNews();

  const related = allNews.filter((a) => a._id !== id).slice(0, 3);
 
  const paragraphs = article?.content?.split(/\n\s*\n/).filter(Boolean) ?? [];
if (article) {
  console.log("ARTICLE RECIBIDO:", article);
  console.log("CONTENT:", article.content);
  console.log("PARAGRAPHS:", paragraphs);}


  return (
    <>
      <PortalNavbar />
      {isLoading ? (
        <NewsDetailSkeleton />
      ) : error || !article ? (
        <main className="flex-1">
          <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
              Noticias
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold uppercase tracking-wide text-balance sm:text-4xl">
              Noticia no encontrada
            </h1>
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              La noticia que buscás no existe o ya no está disponible.
            </p>
            <Link
              href="/news"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a noticias
            </Link>
          </Container>
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero */}
          <section className="relative overflow-hidden border-b border-border bg-card/40">
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background: article.team
                  ? `radial-gradient(120% 90% at 15% 0%, ${article.team.color}55 0%, transparent 60%)`
                  : "radial-gradient(120% 90% at 15% 0%, var(--gold)33 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div
              className="stadium-glow pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <Container className="relative py-10 sm:py-16">
              <Link
                href="/news"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Volver a noticias
              </Link>

              <div className="max-w-3xl">
                <span className="font-display inline-block rounded bg-gold px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
                  {article.category}
                </span>
                <h1 className="font-display mt-4 text-3xl font-bold uppercase leading-tight tracking-wide text-balance sm:text-4xl lg:text-5xl">
                  {article.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                  {article.author && (
                    <span className="font-medium text-foreground">
                      {article.author}
                    </span>
                  )}
                  {article.author && <span aria-hidden="true">·</span>}
                  <span>{formatFullDate(article.date)}</span>
                  {article.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {article.readTime}
                    </span>
                  )}
                </div>

                {article.team && (
                  <Link
                    href={`/teams/${article.team._id}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <TeamCrest team={article.team} size="md" />
                    {article.team.name}
                  </Link>
                )}
              </div>
            </Container>
          </section>

          {/* Article body */}
          <Container className="py-10 sm:py-12">
            <div className="max-w-3xl">
              <p className="border-l-2 border-gold pl-4 font-display text-lg font-medium uppercase leading-relaxed tracking-wide text-foreground sm:text-xl">
                {article.excerpt}
              </p>

              {paragraphs.length > 0 && (
                <div className="mt-8 space-y-6">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-muted-foreground sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </Container>

          {/* More news */}
          <Container className="pb-16">
            <section>
              <SectionHeader
                eyebrow="Editorial"
                title="Más noticias"
                align="left"
                action={
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                  >
                    Ver todas
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                }
              />
              {moreNewsError ? (
                <MoreNewsMessage>
                  No se pudieron cargar más noticias.
                </MoreNewsMessage>
              ) : moreNewsLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex h-32 gap-4 rounded-lg border border-border bg-card p-4"
                    >
                      <Skeleton className="h-20 w-24 shrink-0 rounded-md" />
                      <div className="min-w-0 flex-1 space-y-2 py-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : related.length === 0 ? (
                <MoreNewsMessage>
                  No hay más noticias por el momento.
                </MoreNewsMessage>
              ) : (
                <MoreNewsGrid list={related} />
              )}
            </section>
          </Container>
        </main>
      )}
      <Footer />
    </>
  );
}