
import { buildCategoryFilter } from "@/lib/categories";
import { Team, TeamType } from "@/models/Team";
import { Category } from "@/models/Category";
import { Player } from "@/models/Player";
import { Match } from "@/models/Matches";
import { News } from "@/models/News";
import { MatchEvent } from "@/models/MatchEvent";
import type { UpdateTeamInput } from "@/types/teams";
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

export const updateTeam = async (id: string, data: { name?: string; shortName?: string; city?: string; color?: string; founded?: number; category?: string }) => {
    try {
        const existingTeam = await Team.findById(id);
        if (!existingTeam) {
            return { success: false, error: "Team not found" };
        }

        // Si se proporciona category, verificar que Category exista (opcional, no es required en schema)
        if (data.category) {
            const categoryExists = await Category.exists({ _id: data.category });
            if (!categoryExists) {
                return { success: false, error: "Categoría no válida" };
            }
        }

        // Quitar _id si viene en los datos para evitar conflictos
        const updateData: UpdateTeamInput = { ...data };

        // Validar duplicidad name + category (excluyendo el propio equipo)
        if (updateData.name || updateData.category) {
            const name = updateData.name || existingTeam.name;
            const category = updateData.category || existingTeam.category;
            const duplicate = await Team.findOne({
                name,
                category: typeof category === 'string' ? category : existingTeam.category,
                _id: { $ne: id }
            });
            if (duplicate) {
                return { success: false, error: "Ya existe un equipo con ese nombre en la categoría" };
            }
        }

        const response = await Team.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true, runValidators: true }
        );

        return { success: true, data: response };
    } catch (error) {
        console.error("Error al actualizar equipo:", error);
        return { success: false, error: "Error interno" };
    }
};

export const deleteTeam = async (id: string) => {
    try {
        const existingTeam = await Team.findById(id);
        if (!existingTeam) {
            return { success: false, error: "Team not found" };
        }

        // Verificar dependencias antes de eliminar
        const [playersCount, matchesCount, newsCount, eventsCount] = await Promise.all([
            Player.countDocuments({ team: id }),
            Match.countDocuments({ $or: [{ homeTeam: id }, { awayTeam: id }] }),
            News.countDocuments({ team: id }),
            MatchEvent.countDocuments({ team: id })
        ]);

        if (playersCount > 0) {
            return {
                success: false,
                error: `No se puede eliminar el equipo. Tiene ${playersCount}(s) jugador(es) asociado(s).`,
                code: "TEAM_HAS_PLAYERS"
            };
        }

        if (matchesCount > 0) {
            return {
                success: false,
                error: `No se puede eliminar el equipo. Tiene ${matchesCount}(s) partido(s) asociado(s).`,
                code: "TEAM_HAS_MATCHES"
            };
        }

        if (newsCount > 0) {
            return {
                success: false,
                error: `No se puede eliminar el equipo. Tiene ${newsCount}(s) noticia(s) asociada(s).`,
                code: "TEAM_HAS_NEWS"
            };
        }

        if (eventsCount > 0) {
            return {
                success: false,
                error: `No se puede eliminar el equipo. Tiene ${eventsCount}(s) evento(s) asociado(s).`,
                code: "TEAM_HAS_EVENTS"
            };
        }

        // Si no hay dependencias, eliminar físicamente
        await Team.findByIdAndDelete(id);

        return { success: true, data: {} };
    } catch (error) {
        console.error("Error al eliminar equipo:", error);
        return { success: false, error: "Error interno" };
    }
};