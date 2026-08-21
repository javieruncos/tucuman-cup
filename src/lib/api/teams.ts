import type { Team } from "@/types/teams";

export const fetchTeams = async (): Promise<Team[]> => {
    try {
        const response = await fetch("/api/teams");

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Error fetching teams");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
};


export const fetchTeamId = async (id: string) => {
    const response = await fetch(`/api/teams/${id}`);

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error fetching team");
    }

    const data = await response.json();
    return data.data;
};


// CREATE
export const createTeam = async (team: { name: string; shortName: string; city: string; color: string; founded: number; category: string }): Promise<Team> => {
    const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error al crear equipo");
    }

    const result = await response.json();
    return result.data;
};

// UPDATE
export const updateTeam = async (id: string, data: { name?: string; shortName?: string; city?: string; color?: string; founded?: number; category?: string }): Promise<Team> => {
    const response = await fetch(`/api/teams/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error al actualizar equipo");
    }

    const result = await response.json();
    return result.data;
};

// DELETE
export const deleteTeam = async (id: string): Promise<void> => {
    const response = await fetch(`/api/teams/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error al eliminar equipo");
    }
};