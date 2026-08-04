import { ArrowRight } from "lucide-react";

import { standings } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

const columns = [
  { key: "pos", label: "Pos", className: "w-8" },
  { key: "team", label: "Equipo", className: "flex-1" },
  { key: "pj", label: "PJ", className: "w-8 text-center" },
  { key: "dg", label: "DG", className: "w-10 text-center" },
  { key: "pts", label: "Pts", className: "w-10 text-center" },
] as const;

const leaderPoints = standings[0].points;

export function StandingsWidget() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40">
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
        <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-foreground">
          Tabla de posiciones
        </h3>
        <a
          href="#tabla"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-300"
        >
          Ver completa
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="flex items-center gap-2 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {columns.map((column) => (
          <span key={column.key} className={cn(column.className)}>
            {column.label}
          </span>
        ))}
      </div>

      <ul>
        {standings.map((row) => {
          const isLeader = row.position === 1;
          const pointsPct = Math.round((row.points / leaderPoints) * 100);
          return (
            <li
              key={row.id}
              className={cn(
                "relative flex items-center gap-2 px-5 py-2.5 transition-colors hover:bg-surface-1/50",
                isLeader && "bg-primary/[0.05]",
                "[&+li]:border-t [&+li]:border-border/40"
              )}
            >
              <span className="absolute inset-x-5 bottom-0 h-px bg-surface-3" aria-hidden="true">
                <span
                  className="block h-full bg-primary/40"
                  style={{ width: `${pointsPct}%` }}
                  aria-hidden="true"
                />
              </span>
              <span
                className={cn(
                  "w-8 text-xs font-bold tabular-nums",
                  isLeader ? "text-primary" : "text-muted-foreground"
                )}
              >
                {row.position}
              </span>
              <span className="flex flex-1 items-center gap-2 overflow-hidden">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: row.team.color }}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "truncate text-xs font-medium text-foreground",
                    isLeader && "font-semibold"
                  )}
                >
                  {row.team.name}
                </span>
              </span>
              <span className="w-8 text-center text-xs tabular-nums text-muted-foreground">
                {row.played}
              </span>
              <span className="w-10 text-center text-xs tabular-nums text-muted-foreground">
                {row.gd > 0 ? `+${row.gd}` : row.gd}
              </span>
              <span className="w-10 text-center font-heading text-sm font-bold tabular-nums text-primary">
                {row.points}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}