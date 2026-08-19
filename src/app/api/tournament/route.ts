import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import {
  createTournament,
  getTournament,
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