import { connectDB } from "@/lib/mongodb"
import { createMatch, getMatches } from "@/services/Matches.services"
import { NextResponse } from "next/server"

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

export const POST = async (request: Request) => {
    try {
        await connectDB()
        const match = await request.json()

        // Validar ObjectId de homeTeam
        if (!isValidObjectId(match.homeTeam)) {
            return NextResponse.json(
                { success: false, error: "ID de equipo local inválido" },
                { status: 400 }
            );
        }

        // Validar ObjectId de awayTeam
        if (!isValidObjectId(match.awayTeam)) {
            return NextResponse.json(
                { success: false, error: "ID de equipo visitante inválido" },
                { status: 400 }
            );
        }

        // Validar ObjectId de category si se proporciona
        if (match.category && !isValidObjectId(match.category)) {
            return NextResponse.json(
                { success: false, error: "ID de categoría inválido" },
                { status: 400 }
            );
        }

        const response = await createMatch(match)
        return NextResponse.json({ success: true, data: response }, { status: 201 })
    } catch (error) {
        console.error("Error creating match:", error)

        if (error instanceof Error) {
            if (error.message === "El equipo local y visitante deben ser diferentes") {
                return NextResponse.json(
                    { success: false, error: error.message },
                    { status: 400 }
                );
            }
            if (error.message.includes("Equipo local no encontrado") || error.message.includes("Equipo visitante no encontrado")) {
                return NextResponse.json(
                    { success: false, error: error.message },
                    { status: 404 }
                );
            }
            if (error.message.includes("no pertenece a la categoría")) {
                return NextResponse.json(
                    { success: false, error: error.message },
                    { status: 400 }
                );
            }
            if (error.message === "El partido ya existe") {
                return NextResponse.json(
                    { success: false, error: error.message },
                    { status: 409 }
                );
            }
        }

        return NextResponse.json({ success: false, error: "Error creating match" }, { status: 500 })
    }
}

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;

    const matches = await getMatches(category);

    return NextResponse.json({success: true, data: matches,});
  } catch (error) {
    console.error("Error fetching matches", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error fetching matches",
      },
      { status: 500 }
    );
  }
};