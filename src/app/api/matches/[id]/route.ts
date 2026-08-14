import { getMatchById } from "@/services/Matches.services";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const { id } = await params;

    const match = await getMatchById(id);

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          error: "Partido no encontrado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: match,
    });
  } catch (error) {
    console.error("Error al obtener partido", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener partido",
      },
      { status: 500 }
    );
  }
};