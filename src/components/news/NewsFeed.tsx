"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NewsCard } from "@/components/news/NewsCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useNews } from "@/hooks/useNews";

function NewsFeedSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
      <div className="flex min-h-[420px] flex-col justify-end rounded-xl border border-border bg-card p-6 sm:min-h-[480px] sm:p-8">
        <div className="space-y-3">
          <span className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-7 w-1/2 animate-pulse rounded bg-muted" />
          <p className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <p className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-5 py-5">
            <span className="h-4 w-7 shrink-0 animate-pulse rounded bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <span className="h-3 w-24 animate-pulse rounded bg-muted" />
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
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Ver todas
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
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
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
            <NewsCard
              article={featured}
              variant="feature"
              href={`/news/${featured._id}`}
              className="lg:min-h-full"
            />
            <div className="flex flex-col divide-y divide-border">
              {secondary.slice(0, 4).map((item, index) => (
                <NewsCard
                  key={item._id}
                  article={item}
                  variant="row"
                  index={index}
                  href={`/news/${item._id}`}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
