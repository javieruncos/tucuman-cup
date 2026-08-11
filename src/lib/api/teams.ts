import type { Team } from "@/types/teams";

export const fetchTeams = async (): Promise<Team[]> => {
    try {
        const response = await fetch("/api/teams");
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Error fetching teams");
        }
        return data.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
}