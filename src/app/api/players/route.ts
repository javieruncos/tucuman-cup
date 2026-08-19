import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { createPlayer, getPlayers } from "@/services/Players.services";

export async function GET() {
  try {
    await connectDB();

    const players = await getPlayers();

    return NextResponse.json({ success: true, data: players }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener jugadores", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener jugadores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const player = await createPlayer({
      name: body.name,
      number: body.number,
      position: body.position,
      team: body.team,
      photo: body.photo,
    });

    return NextResponse.json({ success: true, data: player }, { status: 201 });
  } catch (error) {
    console.error("Error al crear jugador", error);
    return NextResponse.json(
      { success: false, error: "Error al crear jugador" },
      { status: 500 }
    );
  }
}