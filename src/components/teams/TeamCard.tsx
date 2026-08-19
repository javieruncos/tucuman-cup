import Link from "next/link";

import { TeamCrest } from "@/components/shared/TeamCrest";
import type { Standing } from "@/types/standings";
import type { Team } from "@/types/teams";

export function TeamCard({
  team,
  standing,
}: {
  team: Team;
  standing?: Standing;
}) {
  return (
    <Link
      href={`/teams/${team._id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/40"
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: team.color }}
        aria-hidden="true"
      />
      <div className="relative mb-auto flex flex-col items-center gap-3 lg:flex-row">
        <TeamCrest team={team} size={52} />
        <div className="min-w-0 text-center lg:text-left">
          <p className="font-display line-clamp-2 min-h-[2.8125rem] text-lg font-semibold uppercase leading-tight tracking-wide">
            {team.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Est. {team.founded} · {team.city}
          </p>
        </div>
      </div>
      <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        <div>
          <p className="tabular font-display text-xl font-bold">
            {standing?.points ?? "—"}
          </p>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Pts
          </p>
        </div>
        <div>
          <p className="tabular font-display text-xl font-bold">
            {standing?.won ?? "—"}
          </p>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Ganados
          </p>
        </div>
        <div>
          <p className="tabular font-display text-xl font-bold text-gold">
            {standing?.goalsFor ?? "—"}
          </p>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            GF
          </p>
        </div>
      </div>
    </Link>
  );
}
