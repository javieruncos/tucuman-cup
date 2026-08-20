"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MatchCard } from "@/components/matches/MatchCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { useMatches } from "@/hooks/useMatches";
import { DEFAULT_CATEGORY_SLUG } from "@/lib/categories";
import { formatRoundRange } from "@/lib/matchDate";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/categories";
import type { MatchResponseType } from "@/types/matches";

const CATEGORY_ORDER = ["masculino", "mas-30", "femenino"];

type MatchGroup = {
  key: string;
  name: string;
  matches: MatchResponseType[];
};

function groupUpcomingByCategory(
  matches: MatchResponseType[],
  categories: Category[]
): MatchGroup[] {
  const scheduled = matches
    .filter((match) => match.status === "scheduled")
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime() ||
        a.time.localeCompare(b.time)
    );

  if (scheduled.length === 0) return [];

  const byId = new Map(categories.map((category) => [category._id, category]));
  const masculino = categories.find(
    (category) => category.slug === DEFAULT_CATEGORY_SLUG
  );
  const masculinoName = masculino?.name ?? "Masculino";

  const buckets = new Map<string, MatchGroup>();
  const push = (key: string, name: string, match: MatchResponseType) => {
    const current = buckets.get(key);
    if (current) {
      current.matches.push(match);
    } else {
      buckets.set(key, { key, name, matches: [match] });
    }
  };

  for (const match of scheduled) {
    const category = match.category ? byId.get(match.category) : undefined;

    if (category) {
      push(category._id, category.name, match);
    } else {
      const key = masculino?._id ?? DEFAULT_CATEGORY_SLUG;
      push(key, masculinoName, match);
    }
  }

  const priority = (slug: string) => {
    const index = CATEGORY_ORDER.indexOf(slug);
    return index === -1 ? CATEGORY_ORDER.length : index;
  };

  const ordered = [...categories]
    .sort(
      (a, b) =>
        priority(a.slug) - priority(b.slug) ||
        a.name.localeCompare(b.name, "es")
    )
    .flatMap((category) => {
      const group = buckets.get(category._id);
      return group ? [group] : [];
    });

  const fallback = buckets.get(DEFAULT_CATEGORY_SLUG);
  if (
    fallback &&
    !categories.some((category) => category._id === fallback.key)
  ) {
    ordered.push(fallback);
  }

  return ordered;
}

function CategorySheet({ group, first }: { group: MatchGroup; first: boolean }) {
  return (
    <section>
      <div
        className={cn(
          "mb-5 flex items-end justify-between gap-4 border-b border-border pb-3",
          first ? "mt-1" : "mt-12"
        )}
      >
        <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
          {group.name}
        </h3>
        <p className="truncate text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {formatRoundRange(group.matches.map((match) => match.date))}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {group.matches.slice(0, 3).map((match) => (
          <MatchCard
            key={match._id}
            match={match}
            href={`/matches/${match._id}`}
            variant="upcoming"
          />
        ))}
      </div>
    </section>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-card-border bg-card p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-2 h-5 w-24" />
        </div>
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-6 sm:gap-4">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="size-[52px] rounded-full sm:size-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-3 w-6" />
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="size-[52px] rounded-full sm:size-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="mx-auto h-4 w-16" />
    </div>
  );
}

function MatchesMessage({
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

export function MatchesByCategory() {
  const { data: matches = [], isLoading, error, refetch } = useMatches();
  const { data: categories = [] } = useCategories();

  if (isLoading) {
    return (
      <Section id="partidos">
        <Container>
          <SectionHeader
            eyebrow="Por categoría"
            title="Próximos partidos"
            align="left"
          />
          <div className="mt-1 mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div className="mt-12 mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="partidos">
        <Container>
          <SectionHeader
            eyebrow="Por categoría"
            title="Próximos partidos"
            align="left"
          />
          <MatchesMessage onRetry={() => refetch()}>
            No se pudieron cargar los partidos.
          </MatchesMessage>
        </Container>
      </Section>
    );
  }

  const groups = groupUpcomingByCategory(matches, categories);

  if (groups.length === 0) {
    return null;
  }

  return (
    <Section id="partidos">
      <Container>
        <SectionHeader
          eyebrow="Por categoría"
          title="Próximos partidos"
          align="left"
          action={
            <Link
              href="/fixtures"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Fixture completo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        />
        {groups.map((group, index) => (
          <CategorySheet key={group.key} group={group} first={index === 0} />
        ))}
      </Container>
    </Section>
  );
}