import { NextResponse } from "next/server";

import {
  createMatchStats,
  getMatchStats,
  updateMatchStats,
  deleteMatchStats,
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: matchId } = await params;

    if (!matchId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, message: "No hay campos para actualizar" },
        { status: 400 }
      );
    }

    const forbiddenFields = ["match", "_id", "createdAt", "updatedAt"];
    for (const field of forbiddenFields) {
      if (field in body) {
        return NextResponse.json(
          { success: false, message: `Campo '${field}' no es modificable` },
          { status: 400 }
        );
      }
    }

    if (body.home) {
      if (body.home.possession !== undefined && (body.home.possession < 0 || body.home.possession > 100)) {
        return NextResponse.json(
          { success: false, message: "Posesión debe estar entre 0 y 100" },
          { status: 400 }
        );
      }
      if (body.home.shots !== undefined && body.home.shots < 0) {
        return NextResponse.json(
          { success: false, message: "Tiros no pueden ser negativos" },
          { status: 400 }
        );
      }
      if (body.home.shotsOnTarget !== undefined && body.home.shotsOnTarget < 0) {
        return NextResponse.json(
          { success: false, message: "Tiros al arco no pueden ser negativos" },
          { status: 400 }
        );
      }
      if (body.home.shotsOnTarget !== undefined && body.home.shots !== undefined && body.home.shotsOnTarget > body.home.shots) {
        return NextResponse.json(
          { success: false, message: "Tiros al arco no pueden superar tiros totales" },
          { status: 400 }
        );
      }
    }

    if (body.away) {
      if (body.away.possession !== undefined && (body.away.possession < 0 || body.away.possession > 100)) {
        return NextResponse.json(
          { success: false, message: "Posesión debe estar entre 0 y 100" },
          { status: 400 }
        );
      }
      if (body.away.shots !== undefined && body.away.shots < 0) {
        return NextResponse.json(
          { success: false, message: "Tiros no pueden ser negativos" },
          { status: 400 }
        );
      }
      if (body.away.shotsOnTarget !== undefined && body.away.shotsOnTarget < 0) {
        return NextResponse.json(
          { success: false, message: "Tiros al arco no pueden ser negativos" },
          { status: 400 }
        );
      }
      if (body.away.shotsOnTarget !== undefined && body.away.shots !== undefined && body.away.shotsOnTarget > body.away.shots) {
        return NextResponse.json(
          { success: false, message: "Tiros al arco no pueden superar tiros totales" },
          { status: 400 }
        );
      }
    }

    const result = await updateMatchStats(matchId, body);

    if (!result.success) {
      const errorMessage = result.error || "";
      const status = errorMessage.includes("no encontrado") ? 404 : 400;
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status }
      );
    }

    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error actualizando estadísticas:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: matchId } = await params;

    if (!matchId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    const result = await deleteMatchStats(matchId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: {} },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error eliminando estadísticas:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}