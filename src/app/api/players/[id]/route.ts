import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getPlayerById, updatePlayer, deletePlayer } from "@/services/Players.services";

export const GET = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    try {
        await connectDB();

        const { id } = await params;

        // Validar ID de MongoDB inválido → 400
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { success: false, error: "ID de jugador inválido" },
                { status: 400 }
            );
        }

        const result = await getPlayerById(id);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });

    } catch (error) {
        console.error("Error al obtener jugador:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};

// PATCH /api/players/[id]
export const PATCH = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await connectDB();

        const { id } = await params;

        // Validar ID de MongoDB inválido → 400
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { success: false, error: "ID de jugador inválido" },
                { status: 400 }
            );
        }

        const body = await request.json();

        // Solo permitir actualizar: name, number, position, photo (NO team)
        // Construir objeto de actualización con los campos válidos del body
        const data: {
            name?: string;
            number?: number;
            position?: "GK" | "DEF" | "MID" | "FWD";
            photo?: string;
        } = {};

        if ("name" in body) data.name = body.name;
        if ("number" in body) data.number = body.number;
        if ("position" in body) data.position = body.position;
        if ("photo" in body) data.photo = body.photo;

        if (Object.keys(data).length === 0) {
            return NextResponse.json(
                { success: false, error: "No hay campos para actualizar" },
                { status: 400 }
            );
        }

        const result = await updatePlayer(id, data);

        if (!result.success) {
            const errorMessage = result.error || "";
            const status = errorMessage.includes("no encontrado") ? 404 :
                           errorMessage.includes("número") ? 409 : 400;
            return NextResponse.json({ success: false, error: result.error }, { status });
        }

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });

    } catch (error) {
        console.error("Error al actualizar jugador:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};

// DELETE /api/players/[id]
export const DELETE = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await connectDB();

        const { id } = await params;

        // Validar ID de MongoDB inválido → 400
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json(
                { success: false, error: "ID de jugador inválido" },
                { status: 400 }
            );
        }

        const result = await deletePlayer(id);

        if (!result.success) {
            if (result.code === "PLAYER_HAS_EVENTS") {
                // Player con eventos asociados → 409
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
        console.error("Error al eliminar jugador:", error);
        return NextResponse.json(
            { success: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
};