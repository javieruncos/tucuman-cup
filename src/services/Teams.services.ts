
import { buildCategoryFilter } from "@/lib/categories";
import { Team, TeamType } from "@/models/Team";
import { getCategoryId } from "./Categories.services";

export const getTeams = async (slug?: string) => {
    try {
        if (slug) {
            const categoryId = await getCategoryId(slug);
            if (!categoryId) return [];
            const teams = await Team.find(buildCategoryFilter(categoryId, slug)).lean();
            return teams;
        }
        const teams = await Team.find({}).lean();
        return teams;
    } catch (error) {
        console.error("Error fetching teams:", error);
        return [];
    }
}

export const createTeam = async (team: TeamType) => {
    try {
        const existingTeam = await Team.findOne({
            name: team.name,
            category: team.category,
        });

        if (existingTeam) {
            return null;
        }
        const response = await Team.create(team);
        return response;
    } catch (error) {
        console.error("Error creating team:", error);
        return null;
    }
}

export const getTeamById = async (id: string) => {
    try {
        const response = await Team.findById(id)
        return response
    } catch (error) {
        console.log("Error al obtener equipo")
        throw error
    }
}