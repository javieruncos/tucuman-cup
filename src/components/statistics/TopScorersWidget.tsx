import { TeamCrest } from "@/components/shared/TeamCrest";
import { topScorers } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

export function TopScorersWidget({ limit }: { limit?: number }) {
  const list = limit ? topScorers.slice(0, limit) : topScorers;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {list.map((scorer, index) => (
        <div
          key={scorer.id}
          className="flex items-center gap-4 border-b border-border/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-elevated"
        >
          <span
            className={cn(
              "tabular font-display grid size-8 shrink-0 place-items-center rounded-md text-sm font-bold",
              index === 0
                ? "bg-gold text-primary-foreground"
                : "bg-elevated text-muted-foreground"
            )}
          >
            {index + 1}
          </span>
          <TeamCrest team={scorer.team} size={30} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{scorer.name}</p>
            <p className="text-xs text-muted-foreground">
              {scorer.team.shortName} · {scorer.position}
            </p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-xs text-muted-foreground">Asistencias</p>
            <p className="tabular font-display font-semibold">
              {scorer.assists}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Goles</p>
            <p className="tabular font-display text-xl font-bold text-gold">
              {scorer.goals}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
