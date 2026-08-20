import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

function MatchCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <Skeleton className="h-3 w-20" />
      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-7 w-10" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

function SectionHeadingSkeleton({ actionClass }: { actionClass?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-2 h-8 w-56" />
      </div>
      {actionClass && <Skeleton className={actionClass} />}
    </div>
  );
}

function SectionCardSkeleton({ count, cols }: { count: number; cols: string }) {
  return (
    <div className={cols}>
      {Array.from({ length: count }).map((_, index) => (
        <MatchCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TeamDetailSkeleton() {
  return (
    <>
      {/* Hero — identidad del club */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <Container className="relative py-10 sm:py-14">
          <Skeleton className="mb-8 h-5 w-24" />

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Skeleton className="size-[88px] shrink-0 rounded-full" />

            <div className="min-w-0">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="mt-3 h-12 w-64 md:h-16 md:w-80" />
              <div className="mt-4">
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Situación en el torneo */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-44" />
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <div className="mt-4 border-y border-border">
          <div className="grid grid-cols-2 divide-x divide-y divide-border/40 sm:grid-cols-5 sm:divide-y-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="px-4 py-5 sm:px-6 sm:py-7">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-8 w-14" />
              </div>
            ))}
          </div>
        </div>

        {/* Próximos partidos */}
        <section className="mt-12">
          <SectionHeadingSkeleton actionClass="h-4 w-24" />
          <SectionCardSkeleton count={4} cols="grid gap-4 sm:grid-cols-2" />
        </section>

        {/* Resultados recientes */}
        <section className="mt-12">
          <SectionHeadingSkeleton actionClass="h-4 w-28" />
          <SectionCardSkeleton count={5} cols="grid gap-4 sm:grid-cols-2" />
        </section>
      </Container>
    </>
  );
}