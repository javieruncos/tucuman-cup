import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsDetailSkeleton() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <Container className="relative py-10 sm:py-16">
          <Skeleton className="mb-8 h-5 w-40" />

          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-10 w-full sm:h-12" />
            <Skeleton className="h-10 w-3/4" />

            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-1 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <Container className="py-10">
        <div className="max-w-3xl space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </Container>

      {/* More news */}
      <Container className="pb-10">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex h-32 gap-4 rounded-xl border border-card-border bg-card p-4"
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
      </Container>
    </>
  );
}
