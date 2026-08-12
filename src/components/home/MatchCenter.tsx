"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Goal,
  MapPin,
  Square,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TeamCrest } from "@/components/shared/TeamCrest";
import {
  featuredMatch,
  type Match,
  type MatchStats,
} from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

function LivePulse() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-danger" />
    </span>
  );
}

const formStyles: Record<"W" | "D" | "L", string> = {
  W: "bg-success text-primary-foreground",
  D: "bg-muted-foreground/25 text-muted-foreground",
  L: "bg-danger text-white",
};

function FormStrip({ form }: { form?: Array<"W" | "D" | "L"> }) {
  if (!form) return null;
  return (
    <div className="flex items-center gap-1" aria-label="Racha de resultados">
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
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold tabular-nums text-foreground">
          {home}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="font-semibold tabular-nums text-foreground">
          {away}
        </span>
      </div>
      <div className="flex h-1 gap-1 overflow-hidden">
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

function EventsTimeline({ match }: { match: Match }) {
  if (match.events.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-muted-foreground">
        Sin eventos todavía — el partido arranca a las {match.time}.
      </p>
    );
  }

  const events = match.events
    .map((event) => ({
      ...event,
      minuteNum: parseInt(event.minute.replace(/\D/g, ""), 10) || 0,
    }))
    .sort((a, b) => a.minuteNum - b.minuteNum);

  return (
    <ol className="flex flex-col gap-2.5">
      {events.map((event) => {
        const isHome = event.teamId === match.home.id;
        const isYellow = event.detail?.toLowerCase().includes("amarilla");
        return (
          <li key={event.id} className="flex items-center gap-3 text-xs">
            <span className="tabular w-7 shrink-0 text-right font-semibold text-muted-foreground">
              {event.minute}
            </span>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface-1">
              {event.type === "goal" ? (
                <Goal className="size-3.5 text-gold" aria-hidden="true" />
              ) : (
                <Square
                  className={cn(
                    "size-2.5",
                    isYellow ? "fill-yellow-400 text-yellow-400" : "fill-danger text-danger"
                  )}
                  aria-hidden="true"
                />
              )}
            </span>
            <span className="min-w-0 truncate font-medium text-foreground">
              {event.player}
            </span>
            <span
              className="ml-auto size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: isHome ? match.home.color : match.away.color }}
              aria-hidden="true"
            />
          </li>
        );
      })}
    </ol>
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
  const home = match.home;
  const away = match.away;

  return (
    <Section id="inicio" className="py-6 sm:py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_80px_160px_-80px_rgba(0,0,0,0.9)]"
        >
          <div className="stadium-glow field-lines absolute inset-0" aria-hidden />
          <div className="relative grid lg:grid-cols-[minmax(0,340px)_1fr]">
            {/* Columna editorial */}
            <div className="flex flex-col gap-6 border-b border-border/50 bg-elevated/30 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:bg-elevated/40">
              <div className="flex items-center gap-2">
                <span className="rounded bg-gold px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
                  Match Center
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-danger/40 bg-danger/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-danger">
                  <LivePulse />
                  En vivo
                </span>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Tucumán Cup 2026 · {match.round} · {match.date}
                </p>
                <h2 className="font-display mt-1 text-3xl font-semibold uppercase leading-tight tracking-wide text-balance">
                  {home.shortName} <span className="text-gold">vs</span>{" "}
                  {away.shortName}
                </h2>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {home.name} y {away.name} se cruzan en {match.venue} en un
                  partido decisivo. {match.minute} del segundo tiempo con el
                  marcador al rojo vivo.
                </p>
              </div>

              <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
                {facts(match).map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-center gap-3 bg-card px-4 py-3"
                  >
                    <fact.icon className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    <dt className="w-16 text-xs uppercase tracking-wide text-muted-foreground sm:w-20">
                      {fact.label}
                    </dt>
                    <dd className="ml-auto text-right text-sm font-medium">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="rounded-lg border border-border/60 bg-card/60 p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Racha
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <TeamCrest team={home} size={24} />
                    <span className="min-w-0 truncate text-sm font-medium">
                      {home.name}
                    </span>
                    <div className="ml-auto">
                      <FormStrip form={home.form} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <TeamCrest team={away} size={24} />
                    <span className="min-w-0 truncate text-sm font-medium">
                      {away.name}
                    </span>
                    <div className="ml-auto">
                      <FormStrip form={away.form} />
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#partidos"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
              >
                Abrir centro de partido <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>

            {/* Scoreboard */}
            <div className="relative flex flex-col">
              <div className="flex items-center justify-between px-6 pt-6 text-[11px] font-semibold uppercase tracking-widest sm:px-8 sm:pt-8">
                <span className="inline-flex items-center gap-2 text-danger">
                  <LivePulse />
                  Transmisión en vivo
                </span>
                <span className="text-muted-foreground">{match.round}</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-8 sm:gap-8 sm:px-8 sm:py-10">
                <div className="flex flex-col items-center gap-3 text-center">
                  <TeamCrest team={home} size={64} className="sm:hidden" />
                  <TeamCrest team={home} size={112} className="hidden sm:inline-flex lg:hidden" />
                  <TeamCrest team={home} size={128} className="hidden lg:inline-flex" />
                  <div>
                    <p className="font-display text-base font-semibold uppercase leading-tight tracking-wide sm:text-xl">
                      {home.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {home.city}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-4">
                    <span className="animate-score-pop font-display text-5xl font-bold leading-none tabular sm:text-7xl lg:text-8xl">
                      {match.homeScore}
                    </span>
                    <span className="font-display text-3xl font-light text-muted-foreground sm:text-4xl">
                      :
                    </span>
                    <span className="animate-score-pop font-display text-5xl font-bold leading-none tabular sm:text-7xl lg:text-8xl">
                      {match.awayScore}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-3 py-1 text-sm font-semibold text-live">
                    <span className="size-1.5 rounded-full bg-live animate-live-pulse" aria-hidden="true" />
                    {match.minute} · 2T
                  </span>
                  <span className="text-center text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    {match.venue}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-3 text-center">
                  <TeamCrest team={away} size={64} className="sm:hidden" />
                  <TeamCrest team={away} size={112} className="hidden sm:inline-flex lg:hidden" />
                  <TeamCrest team={away} size={128} className="hidden lg:inline-flex" />
                  <div>
                    <p className="font-display text-base font-semibold uppercase leading-tight tracking-wide sm:text-xl">
                      {away.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {away.city}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2">
                <div className="bg-card p-6">
                  <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Línea de tiempo
                  </h3>
                  <EventsTimeline match={match} />
                </div>
                <div className="bg-card p-6">
                  <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Estadísticas
                  </h3>
                  {stats && (
                    <div className="flex flex-col gap-4">
                      <StatSplit
                        label="Posesión"
                        stats={stats.possession}
                        homeColor={home.color}
                        awayColor={away.color}
                        index={0}
                      />
                      <StatSplit
                        label="Remates"
                        stats={stats.shots}
                        homeColor={home.color}
                        awayColor={away.color}
                        index={1}
                      />
                      <StatSplit
                        label="Al arco"
                        stats={stats.shotsOnTarget}
                        homeColor={home.color}
                        awayColor={away.color}
                        index={2}
                      />
                      <StatSplit
                        label="Córners"
                        stats={stats.corners}
                        homeColor={home.color}
                        awayColor={away.color}
                        index={3}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
