import { connectDB } from "@/lib/mongodb";
import { getStandingByTeamId } from "@/services/Stading.services";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Team id is required",
        },
        { status: 400 }
      );
    }

    const standing = await getStandingByTeamId(id);

    if (!standing) {
      return NextResponse.json(
        {
          success: false,
          error: "Standing not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: standing,
    });
  } catch (error) {
    console.error("Error fetching team standing:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error fetching team standing",
      },
      { status: 500 }
    );
  }
};