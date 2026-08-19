import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import {
  createMatchEvent,
  getEventsByMatch,
} from "@/services/MatchEvents.services";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const events = await getEventsByMatch(id);

    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los eventos del partido", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener los eventos del partido" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const event = await createMatchEvent({
      match: id,
      team: body.team,
      player: body.player,
      type: body.type,
      minute: body.minute,
      additionalPlayer: body.additionalPlayer ?? null,
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error("Error al crear el evento", error);
    return NextResponse.json(
      { success: false, error: "Error al crear el evento" },
      { status: 500 }
    );
  }
}