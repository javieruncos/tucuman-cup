"use client";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { useStandings } from "@/hooks/useStandings";
import { standings } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

const formTile: Record<"W" | "D" | "L", string> = {
  W: "bg-success text-success-foreground",
  D: "bg-muted text-muted-foreground",
  L: "bg-destructive/80 text-white",
};

function FormTiles({ form }: { form?: Array<"W" | "D" | "L"> }) {
  if (!form || form.length === 0) return null;
  return (
    <div className="flex justify-end gap-1">
      {form.map((result, index) => (
        <span
          key={index}
          title={result === "W" ? "Victoria" : result === "D" ? "Empate" : "Derrota"}
          className={cn(
            "grid size-5 place-items-center rounded text-[10px] font-bold",
            formTile[result]
          )}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

export function StandingsWidget() {

  const {data: standings, isLoading, error} = useStandings()
  
  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error</div>
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[540px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-2 py-3 text-left font-medium">Club</th>
              <th className="px-3 py-3 text-center font-medium">PJ</th>
              <th className="px-3 py-3 text-center font-medium">G</th>
              <th className="px-3 py-3 text-center font-medium">E</th>
              <th className="px-3 py-3 text-center font-medium">P</th>
              <th className="px-3 py-3 text-center font-medium">GF</th>
              <th className="px-3 py-3 text-center font-medium">GC</th>
              <th className="px-3 py-3 text-center font-medium">DG</th>
              <th className="px-3 py-3 text-center font-medium text-foreground">Pts</th>
              <th className="hidden px-4 py-3 text-right font-medium md:table-cell">
                Forma
              </th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => {
              const qualifies = index < 4;
              const relegates = index >= standings.length - 2;
              return (
                <tr
                  key={row._id}
                  className="group border-b border-border/60 transition-colors last:border-0 hover:bg-elevated"
                >
                  <td className="relative px-4 py-3">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-0.5",
                        qualifies
                          ? "bg-gold"
                          : relegates
                            ? "bg-destructive/70"
                            : "bg-transparent"
                      )}
                      aria-hidden="true"
                    />
                    <span className="tabular font-display font-semibold">
                      {row.position}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <a
                      href={`/teams/${row.team._id}`}
                      className="flex items-center gap-2.5 hover:text-gold"
                    >
                      <TeamCrest team={row.team} size={26} />
                      <span className="font-medium">{row.team.name}</span>
                    </a>
                  </td>
                  <td className="tabular px-3 py-3 text-center text-muted-foreground">
                    {row.played}
                  </td>
                  <td className="tabular px-3 py-3 text-center text-muted-foreground">
                    {row.won}
                  </td>
                  <td className="tabular px-3 py-3 text-center text-muted-foreground">
                    {row.drawn}
                  </td>
                  <td className="tabular px-3 py-3 text-center text-muted-foreground">
                    {row.lost}
                  </td>
                  <td className="tabular px-3 py-3 text-center text-muted-foreground">
                    {row.goalsFor}
                  </td>
                  <td className="tabular px-3 py-3 text-center text-muted-foreground">
                    {row.goalsAgainst}
                  </td>
                  <td
                    className={cn(
                      "tabular px-3 py-3 text-center font-medium",
                      row.goalDifference > 0
                        ? "text-success"
                        : row.goalDifference < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    )}
                  >
                    {row.goalDifference > 0 ? "+" : ""}
                    {row.goalDifference}
                  </td>
                  <td className="tabular font-display px-3 py-3 text-center text-base font-bold text-gold">
                    {row.points}
                  </td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-1 rounded-full bg-gold" aria-hidden="true" />
          Clasificación a semifinal
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-1 rounded-full bg-destructive/70"
            aria-hidden="true"
          />
          Descenso
        </span>
      </div>
    </div>
  );
}
