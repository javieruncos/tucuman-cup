import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TeamBadge } from "@/components/shared/TeamBadge";
import { matchStatusMeta, type Match } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

export function MatchCard({ match, className }: { match: Match; className?: string }) {
  const meta = matchStatusMeta[match.status];
  const live = match.status === "live";

  return (
    <Card
      className={cn(
        "gap-0 rounded-xl bg-surface-1 ring-border transition-colors duration-200 hover:ring-primary/30",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {match.round}
        </span>
        <Badge variant={meta.variant}>
          {live && (
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-danger" />
            </span>
          )}
          {meta.label}
        </Badge>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <TeamBadge team={match.home} size="sm" />
          <span className="text-sm font-medium text-foreground">{match.home.shortName}</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-heading text-xl font-bold tabular-nums text-foreground">
            {match.status === "scheduled" ? "–" : `${match.homeScore ?? 0} : ${match.awayScore ?? 0}`}
          </span>
          {live && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-danger">
              {match.minute}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-foreground">{match.away.shortName}</span>
          <TeamBadge team={match.away} size="sm" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 px-4 py-2.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
          {match.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 text-primary" aria-hidden="true" />
          {match.time}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary" aria-hidden="true" />
          {match.venue.split("·")[0].trim()}
        </span>
      </div>
    </Card>
  );
}