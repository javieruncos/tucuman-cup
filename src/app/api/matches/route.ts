import { connectDB } from "@/lib/mongodb"
import { createMatch, getMatches } from "@/services/Matches.services"
import { NextResponse } from "next/server"


export const POST = async (request: Request) => {
    try {
        await connectDB()
        const match = await request.json()
        const response = await createMatch(match)
        return NextResponse.json({ success: true, data: response }, { status: 201 })
    } catch (error) {
        console.error("Error creating match:", error)
        return NextResponse.json({ success: false, error: "Error creating match" }, { status: 500 })
    }
}

export const GET = async () => {
  try {
    await connectDB();

    const matches = await getMatches();

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