"use client";

import type { ReactNode } from "react";

import { NewsCard } from "@/components/news/NewsCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { useNews } from "@/hooks/useNews";
import type { Category } from "@/types/categories";
import type { NewsResponseType } from "@/types/news";

const FEMENINO_CATEGORY_SLUG = "femenino";

function isWomenNews(
  article: NewsResponseType,
  femenino: Category | undefined
): boolean {
  const belongsToWomenCategory =
    femenino && article.team?.category === femenino._id;

  const isWomenEditorialNews = article.category === "Fútbol femenino";

  return Boolean(belongsToWomenCategory || isWomenEditorialNews);
}

function CoverSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-card-border bg-card">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="mt-auto h-3 w-1/2" />
      </div>
    </div>
  );
}

function WomenMessage({
  children,
  onRetry,
}: {
  children: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="font-display mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export function WomenFootballNews() {
  const {
    data: news = [],
    isLoading: newsLoading,
    error: newsError,
    refetch,
  } = useNews();
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  if (newsLoading || categoriesLoading) {
    return (
      <Section id="futbol-femenino">
        <Container>
          <SectionHeader
            eyebrow="Editorial femenina"
            title="Fútbol femenino"
            align="left"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CoverSkeleton />
            <CoverSkeleton />
            <CoverSkeleton />
          </div>
        </Container>
      </Section>
    );
  }

  if (newsError || categoriesError) {
    return (
      <Section id="futbol-femenino">
        <Container>
          <SectionHeader
            eyebrow="Editorial femenina"
            title="Fútbol femenino"
            align="left"
          />
          <WomenMessage onRetry={() => refetch()}>
            No se pudieron cargar las noticias.
          </WomenMessage>
        </Container>
      </Section>
    );
  }

  const femenino = categories.find(
    (category) => category.slug === FEMENINO_CATEGORY_SLUG
  );
  const womenNews = news
    .filter((article) => isWomenNews(article, femenino))
    .slice(0, 3);

  if (womenNews.length === 0) {
    return null;
  }

  return (
    <Section id="futbol-femenino">
      <Container>
        <SectionHeader
          eyebrow="Editorial femenina"
          title="Fútbol femenino"
          align="left"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {womenNews.map((article) => (
            <NewsCard
              key={article._id}
              article={article}
              variant="cover"
              href={`/news/${article._id}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}