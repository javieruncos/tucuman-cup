import { CalendarDays, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { featuredTournament } from "@/lib/mock/landing";
import { cn } from "@/lib/utils";

export function FeaturedTournament() {
  const tournament = featuredTournament;

  return (
    <section id="torneos" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Torneo destacado"
            title="Tucumán Cup 2026"
            description="Seguí el torneo amateur más importante de la provincia, con la tabla y los próximos partidos en vivo."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="mt-14 grid overflow-hidden border-border bg-surface-1 lg:grid-cols-2">
            <div className="flex flex-col gap-6 bg-surface-1 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/15 text-primary">En curso</Badge>
                <Badge variant="outline" className="border-border text-muted-foreground">
                  {tournament.category}
                </Badge>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
                  {tournament.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tournament.season} · {tournament.startDate} – {tournament.endDate}
                </p>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground">
                {tournament.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2 px-3 py-2.5">
                  <Users className="size-4 text-primary" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="font-heading text-lg font-bold text-foreground">
                      {tournament.teamsCount}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Equipos
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2 px-3 py-2.5">
                  <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="font-heading text-lg font-bold text-foreground">
                      {tournament.startDate}–{tournament.endDate}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Duración
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <a
                  href="#cta"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600"
                >
                  Ver torneo completo
                </a>
                <Button variant="outline" className="h-10 px-5 text-foreground">
                  Tabla de posiciones
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-border bg-surface-2 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="flex flex-col gap-3">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                  Equipos participantes
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {tournament.teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 transition-colors hover:bg-background/60"
                    >
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border font-heading text-xs font-bold"
                        style={{
                          backgroundColor: `${team.color}1f`,
                          borderColor: `${team.color}55`,
                          color: team.color,
                        }}
                      >
                        {team.shortName}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">
                          {team.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {team.city}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                  Próximos partidos
                </h4>
                <ul className="flex flex-col gap-2">
                  {tournament.upcomingMatches.map((match) => (
                    <li
                      key={match.id}
                      className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background/40 px-4 py-3 transition-colors hover:bg-background/60"
                    >
                      <div className="flex min-w-0 flex-col">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          {match.round} · {match.date}
                        </p>
                        <p
                          className={cn(
                            "truncate text-sm font-medium text-foreground"
                          )}
                        >
                          {match.home} <span className="text-primary">vs</span>{" "}
                          {match.away}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end text-right">
                        <p className="text-sm text-foreground">{match.time}</p>
                        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="size-3 text-primary" aria-hidden="true" />
                          <span className="sr-only">Cancha: </span>
                          {match.venue}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}