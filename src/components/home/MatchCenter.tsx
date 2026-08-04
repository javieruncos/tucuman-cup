"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, Goal, MapPin, ShieldAlert } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamCrest } from "@/components/shared/TeamCrest";
import {
  featuredMatch,
  portalTeams,
  type Match,
  type MatchStats,
} from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

function LivePulse() {
  return (
    <span className="relative flex size-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-danger" />
    </span>
  );
}

const formStyles: Record<"W" | "D" | "L", string> = {
  W: "bg-success text-white",
  D: "bg-muted-foreground/20 text-muted-foreground",
  L: "bg-danger text-white",
};

function FormStrip({ form }: { form?: Array<"W" | "D" | "L"> }) {
  if (!form) return null;
  return (
    <div className="flex items-center gap-1.5" aria-label="Racha de resultados">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Forma
      </span>
      {form.map((result, index) => (
        <span
          key={index}
          className={cn(
            "flex size-5 items-center justify-center rounded-[4px] text-[10px] font-bold tabular-nums",
            formStyles[result]
          )}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

function StatSplit({
  label,
  stats,
  homeColor,
  awayColor,
  index,
}: {
  label: string;
  stats: MatchStats[keyof MatchStats];
  homeColor: string;
  awayColor: string;
  index: number;
}) {
  const [home, away] = stats;
  const total = home + away;
  const homePct = Math.round((home / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold tabular-nums text-foreground">{home}</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="font-semibold tabular-nums text-foreground">{away}</span>
      </div>
      <div className="flex h-1.5 gap-1 overflow-hidden">
        <div className="flex flex-1 justify-end overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full rounded-full"
            style={{ background: homeColor }}
            initial={{ width: 0 }}
            animate={{ width: `${homePct}%` }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: "easeOut" }}
          />
        </div>
        <div className="flex flex-1 overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full rounded-full opacity-70"
            style={{ background: awayColor }}
            initial={{ width: 0 }}
            animate={{ width: `${100 - homePct}%` }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function EventsBlock({ match }: { match: Match }) {
  const goalEvents = match.events.filter((event) => event.type === "goal");
  const cardEvents = match.events.filter((event) => event.type === "card");
  const goalMax = Math.max(1, goalEvents.length);
  const cardMax = Math.max(1, cardEvents.length);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <Goal className="size-3.5 text-primary" aria-hidden="true" />
          Goles
        </div>
        <div
          className="grid gap-1.5"
          style={{ gridTemplateRows: `repeat(${goalMax}, auto)` }}
        >
          {Array.from({ length: goalMax }).map((_, index) => {
            const event = goalEvents[index];
            if (!event) return <span key={`g-${index}`} aria-hidden="true" />;
            const team = portalTeams.find((t) => t.id === event.teamId);
            return (
              <span
                key={event.id}
                className="flex items-center gap-2 text-xs text-foreground/80"
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: team?.color }}
                  aria-hidden="true"
                />
                <span className="tabular-nums text-muted-foreground">
                  {event.minute}
                </span>
                <span className="font-medium">{event.player}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <ShieldAlert className="size-3.5 text-danger" aria-hidden="true" />
          Tarjetas
        </div>
        <div
          className="grid gap-1.5"
          style={{ gridTemplateRows: `repeat(${cardMax}, auto)` }}
        >
          {Array.from({ length: cardMax }).map((_, index) => {
            const event = cardEvents[index];
            if (!event) return <span key={`c-${index}`} aria-hidden="true" />;
            return (
              <span
                key={event.id}
                className="flex items-center gap-2 text-xs text-foreground/80"
              >
                <span
                  className="size-2 rounded-[2px] bg-danger/80"
                  aria-hidden="true"
                />
                <span className="tabular-nums text-muted-foreground">
                  {event.minute}
                </span>
                <span className="font-medium">{event.player}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const facts = (match: Match) => [
  { label: "Fecha", value: match.date, icon: CalendarDays },
  { label: "Hora", value: `${match.time} hs`, icon: Clock },
  { label: "Estadio", value: match.venue, icon: MapPin },
];

export function MatchCenter() {
  const match = featuredMatch;
  const stats = match.stats;

  return (
    <Section id="inicio">
      <Container>
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Izquierda — contexto editorial */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="order-2 flex flex-col justify-center gap-6 lg:order-1 lg:col-span-5"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-danger/40 bg-danger/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-danger">
                <LivePulse />
                En vivo
                <span className="text-danger/80">· {match.minute} 2T</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Tucumán Cup 2026 · {match.round}
              </span>
            </div>

            <dl className="overflow-hidden rounded-2xl border border-border/40 bg-surface-1/30">
              {facts(match).map((fact, index) => (
                <div
                  key={fact.label}
                  className={cn(
                    "flex items-center justify-between gap-4 px-5 py-3",
                    index > 0 && "border-t border-border/40"
                  )}
                >
                  <dt className="inline-flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                    <fact.icon className="size-3.5 text-primary" aria-hidden="true" />
                    {fact.label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="rounded-2xl border border-border/40 bg-surface-1/30 px-5 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <TeamCrest team={match.home} size="md" />
                  <span className="truncate text-sm font-semibold text-foreground">
                    {match.home.name}
                  </span>
                </div>
                <span className="shrink-0 font-heading text-2xl font-bold tabular-nums text-primary">
                  {match.homeScore}–{match.awayScore}
                </span>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {match.away.name}
                  </span>
                  <TeamCrest team={match.away} size="md" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Derecha — visual principal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="order-1 lg:order-2 lg:col-span-7"
          >
            <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-border/50 bg-surface-1/50 p-6 shadow-[0_60px_140px_-60px_rgba(0,0,0,0.9)] sm:p-8">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[100px]"
                aria-hidden="true"
              />

              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-2 text-danger">
                  <LivePulse />
                  Transmisión en vivo
                </span>
                <span>{match.round}</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                <div className="flex flex-col items-center gap-3">
                  <TeamCrest team={match.home} size="xl" />
                  <span className="text-center font-heading text-sm font-bold uppercase tracking-wide text-foreground sm:text-lg">
                    {match.home.name}
                  </span>
                  <FormStrip form={match.home.form} />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-baseline gap-2 font-heading font-bold tabular-nums leading-none tracking-tight text-foreground sm:gap-3">
                    <span className="text-6xl sm:text-7xl lg:text-8xl">
                      {match.homeScore}
                    </span>
                    <span className="text-4xl text-primary/50 sm:text-5xl">:</span>
                    <span className="text-6xl sm:text-7xl lg:text-8xl">
                      {match.awayScore}
                    </span>
                  </div>
                  <span className="text-center text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    {match.venue}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <TeamCrest team={match.away} size="xl" />
                  <span className="text-center font-heading text-sm font-bold uppercase tracking-wide text-foreground sm:text-lg">
                    {match.away.name}
                  </span>
                  <FormStrip form={match.away.form} />
                </div>
              </div>

              {stats && (
                <div className="flex flex-col gap-5 border-t border-border/40 pt-6">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Estadísticas del partido
                  </span>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <StatSplit
                      label="Posesión"
                      stats={stats.possession}
                      homeColor={match.home.color}
                      awayColor={match.away.color}
                      index={0}
                    />
                    <StatSplit
                      label="Remates"
                      stats={stats.shots}
                      homeColor={match.home.color}
                      awayColor={match.away.color}
                      index={1}
                    />
                    <StatSplit
                      label="Córners"
                      stats={stats.corners}
                      homeColor={match.home.color}
                      awayColor={match.away.color}
                      index={2}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-5 border-t border-border/40 pt-6">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Eventos del partido
                </span>
                <EventsBlock match={match} />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}