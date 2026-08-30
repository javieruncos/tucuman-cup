import { connectDB } from "@/lib/mongodb"
import { getTeamById, updateTeam, deleteTeam } from "@/services/Teams.services"
import { NextResponse } from "next/server"

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

export const GET = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    try {
        await connectDB()
        const { id } = await params

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { success: false, error: "ID de equipo inválido" },
                { status: 400 }
            );
        }

        const teamId = await getTeamById(id)

        if (!teamId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Team not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: teamId }, { status: 200 })

    } catch (error) {
        console.error("Error fetching team:", error);
        return NextResponse.json({ success: false, error: "Error fetching team" }, { status: 400 })
    }
}

// PATCH /api/teams/[id]
export const PATCH = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await connectDB();

        const { id } = await params;
        const body = await request.json();

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { success: false, error: "ID de equipo inválido" },
                { status: 400 }
            );
        }

        // Construir objeto de actualización con los campos válidos del body
        const updateData: {
            name?: string;
            shortName?: string;
            city?: string;
            color?: string;
            founded?: number;
            category?: string;
            active?: boolean;
        } = {};

        if ("name" in body) updateData.name = body.name;
        if ("shortName" in body) updateData.shortName = body.shortName;
        if ("city" in body) updateData.city = body.city;
        if ("color" in body) updateData.color = body.color;
        if ("founded" in body) updateData.founded = body.founded;
        if ("category" in body) updateData.category = body.category;
        if ("active" in body) updateData.active = body.active;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { success: false, error: "No hay campos para actualizar" },
                { status: 400 }
            );
        }

        const result = await updateTeam(id, updateData);

        if (!result.success) {
            const errorMessage = result.error || "";
            const status = errorMessage.includes("no encontrado") ? 404 :
                           errorMessage.includes("duplic") ? 409 : 400;
            return NextResponse.json({ success: false, error: result.error }, { status });
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar equipo:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};

// DELETE /api/teams/[id]
export const DELETE = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await connectDB();

        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { success: false, error: "ID de equipo inválido" },
                { status: 400 }
            );
        }

        const result = await deleteTeam(id);

        if (!result.success) {
            const errorMessage = result.error || "";
            if (result.code === "TEAM_NOT_FOUND" || errorMessage.includes("no encontrado")) {
                return NextResponse.json({ success: false, error: errorMessage }, { status: 404 });
            }
            // Team with dependencies
            return NextResponse.json({ success: false, error: errorMessage }, { status: 409 });
        }

        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar equipo:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};