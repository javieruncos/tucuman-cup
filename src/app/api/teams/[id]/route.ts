import { connectDB } from "@/lib/mongodb"
import { getTeamById } from "@/services/Teams.services"
import { NextResponse } from "next/server"

export const GET = async (request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    try {
        await connectDB()
        const { id } = await params
        const teamId = await getTeamById(id)

        if (!teamId) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Team not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: teamId }, { status: 200 })

    } catch (error) {
        console.error("Error fetching team:", error);
        return NextResponse.json({ success: false, error: "Error fetching team" }, { status: 400 })
    }
}