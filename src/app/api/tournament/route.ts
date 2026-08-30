import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import {
  createTournament,
  getTournament,
  updateTournament,
  deleteTournament,
} from "@/services/Tournament.services";

export async function GET() {
  try {
    await connectDB();

    const tournament = await getTournament();

    if (!tournament) {
      return NextResponse.json(
        { success: false, error: "Torneo no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: tournament }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el torneo", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener el torneo" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const tournament = await createTournament({
      name: body.name,
      season: body.season,
      organization: body.organization,
      location: body.location,
      description: body.description,
      format: body.format,
      status: body.status ?? "active",
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
    });

    return NextResponse.json({ success: true, data: tournament }, { status: 201 });
  } catch (error) {
    console.error("Error al crear el torneo", error);
    return NextResponse.json(
      { success: false, error: "Error al crear el torneo" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "No hay campos para actualizar" },
        { status: 400 }
      );
    }

    const forbiddenFields = ["_id", "createdAt", "updatedAt"];
    for (const field of forbiddenFields) {
      if (field in body) {
        return NextResponse.json(
          { success: false, error: `No se puede modificar ${field}` },
          { status: 400 }
        );
      }
    }

    const result = await updateTournament(body);

    if (!result.success) {
      const errorMessage = result.error || "";
      const status = errorMessage.includes("no encontrado") ? 404 : 400;
      return NextResponse.json({ success: false, error: result.error }, { status });
    }

    return NextResponse.json({ success: true, data: result.data }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el torneo", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connectDB();

    const result = await deleteTournament();

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el torneo", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}