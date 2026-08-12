import { TeamCrest } from "@/components/shared/TeamCrest";
import { matchStatusMeta, type Match } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

function StatusBadge({ match }: { match: Match }) {
  if (match.status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-xs font-semibold text-live">
        <span
          className="size-1.5 rounded-full bg-live animate-live-pulse"
          aria-hidden="true"
        />
        {matchStatusMeta.live.label} {match.minute}
      </span>
    );
  }
  if (match.status === "finished") {
    return (
      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
        {matchStatusMeta.finished.label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
      {matchStatusMeta.scheduled.label}
    </span>
  );
}

export function MatchCard({
  match,
  href = "#",
  className,
}: {
  match: Match;
  href?: string;
  className?: string;
}) {
  const played = match.status === "live" || match.status === "finished";

  return (
    <a
      href={href}
      className={cn(
        "group block rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold/40 hover:bg-elevated",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-muted-foreground">
          {match.round}
        </span>
        <StatusBadge match={match} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <TeamCrest team={match.home} size={32} />
          <span className="truncate text-sm font-medium text-foreground">
            {match.home.name}
          </span>
        </div>
        <span className="tabular font-display shrink-0 px-2 text-lg font-semibold text-foreground">
          {played ? match.homeScore : "–"}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <TeamCrest team={match.away} size={32} />
          <span className="truncate text-sm font-medium text-foreground">
            {match.away.name}
          </span>
        </div>
        <span className="tabular font-display shrink-0 px-2 text-lg font-semibold text-foreground">
          {played ? match.awayScore : "–"}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="truncate">{match.venue}</span>
        <span className="shrink-0">
          {match.status === "scheduled"
            ? `${match.date} · ${match.time}`
            : match.date}
        </span>
      </div>
    </a>
  );
}
