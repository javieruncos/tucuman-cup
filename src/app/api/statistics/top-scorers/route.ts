import { connectDB } from "@/lib/mongodb";
import { getTopScorers } from "@/services/MatchEvents.services";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const category = new URL(request.url).searchParams.get("category") ?? undefined;

    const topScorers = await getTopScorers(category);

    return NextResponse.json({ success: true, data: topScorers }, { status: 200 });
  } catch (error) {
    console.log("Error al obtener goleadores", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener goleadores" },
      { status: 500 }
    );
  }
};