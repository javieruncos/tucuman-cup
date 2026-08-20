import { ArrowRight, ArrowUpDown, CircleDot } from "lucide-react";
import type { ReactNode } from "react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import type { HalftimeScore } from "@/types/matches";
import type { MatchEventResponseType } from "@/types/matchEvents";

function EventIcon({ event }: { event: MatchEventResponseType }) {
  if (event.type === "goal") {
    return (
      <span className="relative z-[1] grid size-7 shrink-0 place-items-center rounded-full border border-gold/40 bg-surface-2 text-gold">
        <CircleDot className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
      </span>
    );
  }

  if (event.type === "red_card") {
    return (
      <span className="relative z-[1] grid size-7 shrink-0 place-items-center rounded-full border border-destructive/40 bg-surface-2">
        <span
          className="block size-2.5 rounded-[2px] bg-destructive"
          aria-hidden="true"
        />
      </span>
    );
  }

  if (event.type === "yellow_card") {
    return (
      <span className="relative z-[1] grid size-7 shrink-0 place-items-center rounded-full border border-warning/40 bg-surface-2">
        <span
          className="block size-2.5 rounded-[2px] bg-warning"
          aria-hidden="true"
        />
      </span>
    );
  }

  return (
    <span className="relative z-[1] grid size-7 shrink-0 place-items-center rounded-full border border-border/80 bg-surface-2 text-muted-foreground">
      <ArrowUpDown className="size-3.5" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

function HalftimeRow({ score }: { score: HalftimeScore }) {
  return (
    <li className="grid grid-cols-[3rem_1.75rem_1fr] items-center gap-x-2.5 py-2.5">
      <span className="tabular font-display pr-1 text-right text-sm font-bold text-muted-foreground/70">
        {"45'"}
      </span>
      <span className="relative z-[1] grid size-7 shrink-0 place-items-center rounded-full border border-border/80 bg-surface-2">
        <span className="size-1.5 rounded-full bg-border" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
        <span className="h-px min-w-4 flex-1 bg-border/50" aria-hidden="true" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
          Fin del primer tiempo
        </span>
        <span className="tabular font-display shrink-0 text-xs font-bold text-foreground">
          Descanso {score.home ?? "–"}–{score.away ?? "–"}
        </span>
      </div>
    </li>
  );
}

function EventRow({
  event,
  score,
}: {
  event: MatchEventResponseType;
  score?: string;
}) {
  const minute = `${event.minute}'`;

  if (event.type === "goal") {
    return (
      <li className="grid grid-cols-[3rem_1.75rem_1fr] items-center gap-x-2.5 py-3">
        <span className="tabular font-display pr-1 text-right text-sm font-bold text-gold">
          {minute}
        </span>
        <EventIcon event={event} />
        <div className="flex min-w-0 items-center gap-2.5">
          {score && (
            <span className="tabular font-display shrink-0 text-xs font-bold text-gold">
              {score}
            </span>
          )}
          <span className="truncate text-sm font-medium text-foreground">
            {event.player.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {event.team.shortName}
          </span>
          <TeamCrest team={event.team} size={18} className="ml-auto shrink-0" />
        </div>
      </li>
    );
  }

  if (event.type === "yellow_card" || event.type === "red_card") {
    const isRed = event.type === "red_card";
    return (
      <li className="grid grid-cols-[3rem_1.75rem_1fr] items-center gap-x-2.5 py-3">
        <span className="tabular font-display pr-1 text-right text-sm font-bold text-gold">
          {minute}
        </span>
        <EventIcon event={event} />
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="hidden text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:inline">
            {isRed ? "Roja" : "Amarilla"}
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {event.player.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {event.team.shortName}
          </span>
          <TeamCrest team={event.team} size={18} className="ml-auto shrink-0" />
        </div>
      </li>
    );
  }

  return (
    <li className="grid grid-cols-[3rem_1.75rem_1fr] items-center gap-x-2.5 py-3">
      <span className="tabular font-display pr-1 text-right text-sm font-bold text-gold">
        {minute}
      </span>
      <EventIcon event={event} />
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        <span className="hidden text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:inline">
          Cambio
        </span>
        <span className="truncate text-sm font-medium text-foreground">
          {event.player.name}
        </span>
        <ArrowRight
          className="size-3.5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="truncate text-sm font-medium text-foreground">
          {event.additionalPlayer?.name ?? "—"}
        </span>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          · {event.team.shortName}
        </span>
        <TeamCrest team={event.team} size={18} className="ml-auto shrink-0" />
      </div>
    </li>
  );
}

export function MatchTimeline({
  events,
  halftime,
  homeTeamId,
  awayTeamId,
}: {
  events: MatchEventResponseType[];
  halftime: HalftimeScore | null;
  homeTeamId: string;
  awayTeamId: string;
}) {
  let home = 0;
  let away = 0;
  let halftimeInserted = false;
  const items: ReactNode[] = [];

  for (const event of events) {
    if (!halftimeInserted && halftime !== null && event.minute > 45) {
      halftimeInserted = true;
      items.push(<HalftimeRow key={`ht-${event._id}`} score={halftime} />);
    }

    if (event.type === "goal") {
      if (event.team._id === homeTeamId) home += 1;
      else if (event.team._id === awayTeamId) away += 1;
    }

    items.push(
      <EventRow
        key={event._id}
        event={event}
        score={event.type === "goal" ? `${home}–${away}` : undefined}
      />
    );
  }

  return (
    <ol className="relative" aria-label="Eventos del partido">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-18 top-0 w-px bg-border/40"
      />
      {items}
    </ol>
  );
}