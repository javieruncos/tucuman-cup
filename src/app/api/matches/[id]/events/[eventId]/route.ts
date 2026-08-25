import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getMatchEventById, updateMatchEvent, deleteMatchEvent } from "@/services/MatchEvents.services";

export const GET = async (request: Request,
    { params }: { params: Promise<{ id: string; eventId: string }> }
) => {
    try {
        await connectDB();

        const { id: matchId, eventId } = await params;

        // Validar IDs de MongoDB
        if (!matchId.match(/^[0-9a-fA-F]{24}$/) || !eventId.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { success: false, error: "ID inválido" },
                { status: 400 }
            );
        }

        const result = await getMatchEventById(eventId);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error || "" },
                { status: 404 }
            );
        }

        // Verificar que el evento pertenece al match indicado
        if (result.data.match?.toString() !== matchId) {
            return NextResponse.json(
                { success: false, error: "Evento no pertenece a este match" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });

    } catch (error) {
        console.error("Error al obtener evento:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};

// PATCH /api/matches/[id]/events/[eventId]
export const PATCH = async (request: Request,
    { params }: { params: Promise<{ id: string; eventId: string }> }
) => {
    try {
        await connectDB();

        const { id: matchId, eventId } = await params;

        // Validar IDs de MongoDB
        if (!matchId.match(/^[0-9a-fA-F]{24}$/) || !eventId.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { success: false, error: "ID inválido" },
                { status: 400 }
            );
        }

        const body = await request.json();

        // SOLO permitir modificar type y minute
        const validFields = ["type", "minute"];
        
        // Construir objeto de actualización con los campos válidos del body
        const updateData: { type?: string; minute?: number } = {};

        if ("type" in body) {
            if (!["goal", "yellow_card", "red_card", "substitution"].includes(body.type)) {
                return NextResponse.json(
                    { success: false, error: "Tipo de evento inválido" },
                    { status: 400 }
                );
            }
            updateData.type = body.type;
        }
        if ("minute" in body) {
            if (body.minute < 1 || body.minute > 130) {
                return NextResponse.json(
                    { success: false, error: "Minuto fuera de rango (1-130)" },
                    { status: 400 }
                );
            }
            updateData.minute = body.minute;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { success: false, error: "No hay campos para actualizar" },
                { status: 400 }
            );
        }

        const result = await updateMatchEvent(eventId, updateData);

        if (!result.success) {
            const errorMessage = result.error || "";
            const status = errorMessage.includes("no encontrado") ? 404 :
                           errorMessage.includes("inválido") ? 400 : 400;
            return NextResponse.json({ success: false, error: result.error }, { status });
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });

    } catch (error) {
        console.error("Error al actualizar evento:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};

// DELETE /api/matches/[id]/events/[eventId]
export const DELETE = async (request: Request,
    { params }: { params: Promise<{ id: string; eventId: string }> }
) => {
    try {
        await connectDB();

        const { id: matchId, eventId } = await params;

        // Validar IDs de MongoDB
        if (!matchId.match(/^[0-9a-fA-F]{24}$/) || !eventId.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { success: false, error: "ID inválido" },
                { status: 400 }
            );
        }

        const result = await deleteMatchEvent(eventId);

        if (!result.success) {
            if (result.error && result.error.includes("no encontrado")) {
                return NextResponse.json({ success: false, error: result.error }, { status: 404 });
            }
            const errorMessage = result.error || "";
            return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: {} }, { status: 200 });

    } catch (error) {
        console.error("Error al eliminar evento:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};