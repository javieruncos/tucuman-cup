import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { cn } from "@/lib/utils";
import { formatMatchDay } from "@/lib/matchDate";
import type { MatchResponseType } from "@/types/matches";
import type { Team } from "@/types/teams";

type MatchCardVariant = "default" | "upcoming" | "result" | "live";

function StatusBadge({ status }: { status: MatchResponseType["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-xs font-semibold text-live">
        <span
          className="size-1.5 rounded-full bg-live animate-live-pulse"
          aria-hidden="true"
        />
        En vivo
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-success">
        Finalizado
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-warning px-2.5 py-1 text-xs font-semibold text-warning">
      Próximo
    </span>
  );
}

function TeamSide({ team }: { team: Team }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-3 text-center">
      <TeamCrest
        team={team}
        size={52}
        className="sm:hidden transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <TeamCrest
        team={team}
        size={64}
        className="hidden sm:inline-flex transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <p className="font-display line-clamp-2 min-h-[2.25rem] text-sm font-semibold uppercase leading-tight tracking-wide text-foreground sm:min-h-[2.5rem] sm:text-base">
        {team.name}
      </p>
    </div>
  );
}

function UpcomingCard({ match, href }: { match: MatchResponseType; href: string }) {
  const { weekday, dayMonth } = formatMatchDay(match.date);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-5 rounded-xl border border-card-border bg-card p-6 transition-colors duration-300 hover:border-gold/40 hover:bg-elevated sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {match.round && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {match.round}
            </p>
          )}
          <p className="font-display mt-1 text-lg font-semibold uppercase leading-none tracking-wide text-foreground">
            {weekday && `${weekday} `}
            {dayMonth}
          </p>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
          Próximo
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <TeamSide team={match.homeTeam} />
          <span
            className="font-display shrink-0 text-xs font-semibold tracking-widest text-muted-foreground/50"
            aria-hidden="true"
          >
            VS
          </span>
          <TeamSide team={match.awayTeam} />
        </div>
      </div>

      <p className="text-center text-sm font-medium text-foreground/90">
        {match.time} HS
      </p>

      <div className="flex items-center justify-center gap-3 border-t border-border/30 pt-4">
        {match.venue ? (
          <span className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{match.venue}</span>
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-gold">
          Ver partido
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

function ResultRow({
  team,
  score,
  winner,
  live,
}: {
  team: Team;
  score: number;
  winner: boolean;
  live: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-2.5">
      <span className="flex min-w-0 items-center gap-2.5">
        <TeamCrest team={team} size={32} className="shrink-0" />
        <span
          className={cn(
            "font-display line-clamp-2 min-w-0 text-sm font-semibold uppercase leading-tight tracking-wide",
            winner ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {team.name}
        </span>
      </span>
      <span
        className={cn(
          "tabular font-display text-2xl font-bold sm:text-3xl",
          live ? "text-live" : winner ? "text-gold" : "text-foreground/80"
        )}
      >
        {score}
      </span>
    </div>
  );
}

function ResultCard({
  match,
  href,
  live,
}: {
  match: MatchResponseType;
  href: string;
  live: boolean;
}) {
  const { dayMonth } = formatMatchDay(match.date);
  const winner =
    match.homeScore > match.awayScore
      ? "home"
      : match.awayScore > match.homeScore
        ? "away"
        : "";

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-xl border p-5 transition-colors duration-300 sm:p-6",
        live
          ? "border-live/40 bg-live/5 hover:border-live/60 hover:bg-live/10"
          : "border-card-border bg-card hover:border-gold/40 hover:bg-elevated"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
            live ? "bg-live/15 text-live" : "bg-muted text-muted-foreground"
          )}
        >
          {live && (
            <span
              className="size-1.5 rounded-full bg-live animate-live-pulse"
              aria-hidden="true"
            />
          )}
          {live ? "En vivo" : "Finalizado"}
        </span>
        <span className="truncate text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {match.round && <span className="mr-1.5">{match.round} ·</span>}
          {dayMonth}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col divide-y divide-border/50">
        <ResultRow
          team={match.homeTeam}
          score={match.homeScore}
          winner={winner === "home"}
          live={live}
        />
        <ResultRow
          team={match.awayTeam}
          score={match.awayScore}
          winner={winner === "away"}
          live={live}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/30 pt-3">
        {match.venue ? (
          <span className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{match.venue}</span>
          </span>
        ) : (
          <span className="text-xs font-medium text-muted-foreground">
            {match.time} HS
          </span>
        )}
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-gold">
          Ver partido
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

export function MatchCard({
  match,
  href = "#",
  className,
  variant = "default",
}: {
  match: MatchResponseType;
  href?: string;
  className?: string;
  variant?: MatchCardVariant;
}) {
  if (variant === "upcoming") return <UpcomingCard match={match} href={href} />;
  if (variant === "result") return <ResultCard match={match} href={href} live={false} />;
  if (variant === "live") return <ResultCard match={match} href={href} live={match.status === "live"} />;

  const played = match.status === "live" || match.status === "finished";

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-xl border border-card-border bg-card p-4 transition-colors hover:border-gold/40 hover:bg-elevated",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-muted-foreground">
          {new Date(match.date).toLocaleDateString("es-AR")}
        </span>
        <StatusBadge status={match.status} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <TeamCrest team={match.homeTeam} size={32} />
          <span className="truncate text-sm font-medium text-foreground">
            {match.homeTeam.name}
          </span>
        </div>
        <span className="tabular font-display shrink-0 px-2 text-lg font-semibold text-foreground">
          {played ? match.homeScore : "–"}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <TeamCrest team={match.awayTeam} size={32} />
          <span className="truncate text-sm font-medium text-foreground">
            {match.awayTeam.name}
          </span>
        </div>
        <span className="tabular font-display shrink-0 px-2 text-lg font-semibold text-foreground">
          {played ? match.awayScore : "–"}
        </span>
      </div>

      {match.status === "scheduled" && (
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="shrink-0">{match.time} hs</span>
        </div>
      )}
    </Link>
  );
}