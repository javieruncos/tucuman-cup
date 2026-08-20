import { MatchEvent } from "@/models/MatchEvent";
import { Match } from "@/models/Matches";
import "@/models/Player";
import "@/models/Team";
import { buildCategoryFilter } from "@/lib/categories";
import { getCategoryId } from "@/services/Categories.services";
import type { MatchEventInput } from "@/types/matchEvents";
import type { TopScorer } from "@/types/statistics";

type TopScorerEvent = {
  player: unknown;
  team: unknown;
};

export const getEventsByMatch = async (matchId: string) => {
  try {
    return await MatchEvent.find({ match: matchId })
      .populate("player")
      .populate("additionalPlayer")
      .populate("team")
      .sort({ minute: 1 });
  } catch (error) {
    console.error("Error al obtener eventos del partido", error);
    throw error;
  }
};

export const createMatchEvent = async (event: MatchEventInput) => {
  try {
    const response = await MatchEvent.create(event);
    return response.populate(["player", "additionalPlayer", "team"]);
  } catch (error) {
    console.error("Error al crear evento", error);
    throw error;
  }
};

const countGoals = (events: TopScorerEvent[]): TopScorer[] => {
  const byPlayer = new Map<string, TopScorer>();

  for (const event of events) {
    const player = event.player as unknown as TopScorer["player"] | null;
    const team = event.team as unknown as TopScorer["team"] | null;

    if (!player || !team) continue;

    const key = String(player._id);
    const current = byPlayer.get(key);

    if (current) {
      current.goals += 1;
    } else {
      byPlayer.set(key, { player, team, goals: 1 });
    }
  }

  return [...byPlayer.values()].sort(
    (a, b) =>
      b.goals - a.goals || a.player.name.localeCompare(b.player.name, "es")
  );
};

export const getTopScorers = async (slug?: string): Promise<TopScorer[]> => {
  try {
    if (!slug) {
      const events = await MatchEvent.find({ type: "goal" })
        .populate("player")
        .populate("team");

      return countGoals(events as unknown as TopScorerEvent[]);
    }

    const categoryId = await getCategoryId(slug);
    if (!categoryId) return [];

    const matches = await Match.find(
      buildCategoryFilter(categoryId, slug),
      "_id"
    ).lean();
    const matchIds = matches.map((match) => match._id);

    const events = await MatchEvent.find({
      type: "goal",
      match: { $in: matchIds },
    })
      .populate("player")
      .populate("team");

    return countGoals(events as unknown as TopScorerEvent[]);
  } catch (error) {
    console.error("Error al obtener goleadores", error);
    throw error;
  }
};