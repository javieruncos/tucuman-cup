"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { NewsCard } from "@/components/news/NewsCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useNews } from "@/hooks/useNews";

function NewsFeedSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex min-h-[380px] flex-col justify-end rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="space-y-3">
          <span className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-7 w-1/2 animate-pulse rounded bg-muted" />
          <p className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <p className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
          >
            <div className="h-20 w-24 shrink-0 animate-pulse rounded-md bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsFeedMessage({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export function NewsFeed() {
  const { data: news, isLoading, isError } = useNews();
  const [featured, ...secondary] = news ?? [];

  return (
    <Section id="noticias">
      <Container>
        <SectionHeader
          eyebrow="Editorial"
          title="Noticias destacadas"
          align="left"
          action={
            <a
              href="#noticias"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Ver todas
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          }
        />
        {isLoading ? (
          <NewsFeedSkeleton />
        ) : isError ? (
          <NewsFeedMessage>No se pudieron cargar las noticias.</NewsFeedMessage>
        ) : !featured ? (
          <NewsFeedMessage>
            No hay noticias disponibles por el momento.
          </NewsFeedMessage>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <NewsCard article={featured} variant="feature" />
            <div className="flex flex-col gap-4">
              {secondary.slice(0, 4).map((item) => (
                <NewsCard key={item._id} article={item} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
