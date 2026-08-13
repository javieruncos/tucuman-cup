import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

export function MatchDetailSkeleton() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <Container className="relative py-10 sm:py-14">
          {/* Back link */}
          <Skeleton className="mb-8 h-5 w-40" />

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

      {/* Match information */}
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-card p-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-3 h-6 w-28" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
