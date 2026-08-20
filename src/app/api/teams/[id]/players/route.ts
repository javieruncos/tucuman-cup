import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getPlayersByTeam } from "@/services/Players.services";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const players = await getPlayersByTeam(id);

    return NextResponse.json({ success: true, data: players }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el plantel", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener el plantel" },
      { status: 500 }
    );
  }
}