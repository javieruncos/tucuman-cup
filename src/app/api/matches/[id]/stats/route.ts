import { NextResponse } from "next/server";

import {
  createMatchStats,
  getMatchStats,
} from "@/services/MatchStats.services";
import { connectDB } from "@/lib/mongodb";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const stats = await createMatchStats(id, body);

    return NextResponse.json(
      {
        success: true,
        data: stats,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating match stats:", error);

    if (error instanceof Error) {
      if (
        error.message === "Partido no encontrado" ||
        error.message === "Las estadísticas de este partido ya existen"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error al crear las estadísticas",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const stats = await getMatchStats(id);

    if (!stats) {
      return NextResponse.json(
        {
          success: false,
          message: "Estadísticas no encontradas",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching match stats:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener las estadísticas",
      },
      { status: 500 }
    );
  }
}