import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

export function TeamDetailSkeleton() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <Container className="relative py-10 sm:py-14">
          {/* Back link */}
          <Skeleton className="mb-8 h-5 w-24" />

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            {/* Crest */}
            <Skeleton className="size-[88px] shrink-0 rounded-full" />

            <div className="min-w-0">
              {/* City */}
              <Skeleton className="h-3 w-32" />

              {/* Team name */}
              <Skeleton className="mt-3 h-12 w-64 md:h-16 md:w-80" />

              {/* Metadata */}
              <div className="mt-4 flex items-center gap-6">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Team information */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-card p-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-3 h-6 w-28" />
            </div>
          ))}
        </div>

        {/* Statistics */}
        <section className="mt-12">
          <div className="mb-6">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-2 h-8 w-48" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-5 text-center"
              >
                <Skeleton className="mx-auto h-3 w-16" />
                <Skeleton className="mx-auto mt-3 h-9 w-12" />
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming matches */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2 h-8 w-56" />
            </div>

            <Skeleton className="h-4 w-24" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-5"
              >
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
            ))}
          </div>
        </section>

        {/* Recent results */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-8 w-56" />
            </div>

            <Skeleton className="h-4 w-28" />
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-4"
              >
                <Skeleton className="h-3 w-12 shrink-0" />

                <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-7 w-12 rounded-full" />
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}