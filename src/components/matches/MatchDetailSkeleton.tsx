import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

export function MatchDetailSkeleton() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <Container className="relative py-10 sm:py-14">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-3">
            <Skeleton className="h-3.5 w-14" />
            <Skeleton className="h-3.5 w-3" />
            <Skeleton className="h-3.5 w-20" />
          </div>

          {/* Date · time · status */}
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          {/* Scoreboard */}
          <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="flex flex-col items-center gap-3 md:flex-1">
              <Skeleton className="size-20 rounded-full md:size-[88px]" />
              <Skeleton className="h-5 w-44" />
            </div>

            <Skeleton className="h-16 w-28" />

            <div className="flex flex-col items-center gap-3 md:flex-1">
              <Skeleton className="size-20 rounded-full md:size-[88px]" />
              <Skeleton className="h-5 w-44" />
            </div>
          </div>
        </Container>
      </section>

      {/* Compact editorial meta */}
      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-16" />
          ))}
        </div>
      </Container>

      {/* Timeline */}
      <Container className="pb-10 pt-0">
        <Skeleton className="mb-4 h-3 w-32" />
        <div className="divide-y divide-border/30">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 py-3.5">
              <Skeleton className="h-3.5 w-9" />
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="ml-auto size-5 rounded-full" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
