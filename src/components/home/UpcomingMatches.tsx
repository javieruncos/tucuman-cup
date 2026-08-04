import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { upcomingMatches, type Match } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

function FixtureColumn({ match, index }: { match: Match; index: number }) {
  return (
    <a
      href="#partidos"
      className={cn(
        "group flex flex-col gap-5 p-6 transition-colors duration-300 hover:bg-surface-1/70",
        index > 0 && "border-t border-border/50 lg:border-t-0 lg:border-l"
      )}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        <span>{match.round}</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 text-primary" aria-hidden="true" />
          {match.time}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <TeamCrest team={match.home} size="md" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {match.home.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {match.home.city}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/70">
          <span className="h-px w-6 bg-primary/30" aria-hidden="true" />
          vs
          <span className="h-px w-6 bg-primary/30" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-3">
          <TeamCrest team={match.away} size="md" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {match.away.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {match.away.city}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary" aria-hidden="true" />
          {match.venue}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
          {match.date}
        </span>
      </div>
    </a>
  );
}

export function UpcomingMatches() {
  return (
    <Section id="partidos">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Agenda"
            title="Próximos partidos"
            align="left"
          />
          <a
            href="#partidos"
            className="mb-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-300"
          >
            Ver fixture completo
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40 sm:mt-8 lg:grid lg:grid-cols-3">
          {upcomingMatches.map((match, index) => (
            <FixtureColumn key={match.id} match={match} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}