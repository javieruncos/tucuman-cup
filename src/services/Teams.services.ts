
import { Team, TeamType } from "@/models/Team";

export const getTeams = async () => {
    try {
        const response = await Team.find();
        return response;
    } catch (error) {
        console.error("Error fetching teams:", error);
        return null;
    }
}

export const createTeam = async (team: TeamType) => {
    try {
        const response = await Team.create(team);
        return response;
    } catch (error) {
        console.error("Error creating team:", error);
        return null;
    }
}