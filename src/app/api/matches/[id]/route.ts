import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getMatchById, updateMatch, deleteMatch } from "@/services/Matches.services";

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

export const GET = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    try {
        await connectDB();

        const { id } = await params;

        // Validar ID de MongoDB inválido → 400
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { success: false, error: "ID de partido inválido" },
                { status: 400 }
            );
        }

        const result = await getMatchById(id);

        if (!result) {
            return NextResponse.json(
                { success: false, error: "Partido no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result }, { status: 200 });

    } catch (error) {
        console.error("Error al obtener partido:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};

// PATCH /api/matches/[id]
export const PATCH = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await connectDB();

        const { id } = await params;

        // Validar ID de MongoDB inválido → 400
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { success: false, error: "ID de partido inválido" },
                { status: 400 }
            );
        }

        const body = await request.json();

        // Rechazar campos no permitidos
        const forbiddenFields = ["homeTeam", "awayTeam", "category", "_id", "createdAt", "updatedAt"];
        for (const field of forbiddenFields) {
            if (field in body) {
                return NextResponse.json(
                    { success: false, error: `No se puede modificar ${field}` },
                    { status: 400 }
                );
            }
        }

        // Solo permitir actualizar: date, time, status, homeScore, awayScore, halftimeScore, round, venue
        // Construir objeto de actualización con los campos válidos del body
        const updateData: {
            date?: string;
            time?: string;
            status?: "scheduled" | "live" | "finished";
            homeScore?: number;
            awayScore?: number;
            halftimeScore?: { home: number | null; away: number | null };
            round?: string;
            venue?: string;
        } = {};

        if ("date" in body) updateData.date = body.date;
        if ("time" in body) updateData.time = body.time;
        if ("status" in body) {
            const validStatus: "scheduled" | "live" | "finished" = body.status;
            updateData.status = validStatus;
        }
        if ("homeScore" in body) {
            if (body.homeScore < 0) {
                return NextResponse.json(
                    { success: false, error: "homeScore no puede ser negativo" },
                    { status: 400 }
                );
            }
            updateData.homeScore = body.homeScore;
        }
        if ("awayScore" in body) {
            if (body.awayScore < 0) {
                return NextResponse.json(
                    { success: false, error: "awayScore no puede ser negativo" },
                    { status: 400 }
                );
            }
            updateData.awayScore = body.awayScore;
        }
        if ("halftimeScore" in body) updateData.halftimeScore = body.halftimeScore;
        if ("round" in body) updateData.round = body.round;
        if ("venue" in body) updateData.venue = body.venue;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { success: false, error: "No hay campos para actualizar" },
                { status: 400 }
            );
        }

        const result = await updateMatch(id, updateData);

        if (!result.success) {
            const errorMessage = result.error || "";
            const status = errorMessage.includes("no encontrado") ? 404 :
                           errorMessage.includes("Ya existe") ? 409 : 400;
            return NextResponse.json({ success: false, error: result.error }, { status });
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });

    } catch (error) {
        console.error("Error al actualizar partido:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};

// DELETE /api/matches/[id]
export const DELETE = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await connectDB();

        const { id } = await params;

        // Validar ID de MongoDB inválido → 400
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { success: false, error: "ID de partido inválido" },
                { status: 400 }
            );
        }

        const result = await deleteMatch(id);

        if (!result.success) {
            if (result.code === "MATCH_HAS_DEPENDENCIES") {
                // Partido con MatchStats/MatchEvents → 409
                return NextResponse.json({ success: false, error: result.error }, { status: 409 });
            }
            const errorMessage = result.error || "";
            if (errorMessage.includes("no encontrado")) {
                return NextResponse.json({ success: false, error: result.error }, { status: 404 });
            }
            // Cualquier otro error → 400
            return NextResponse.json({ success: false, error: result.error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: {} }, { status: 200 });

    } catch (error) {
        console.error("Error al eliminar partido:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};