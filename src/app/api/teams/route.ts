import { connectDB } from "@/lib/mongodb";
import { createTeam, getTeams } from "@/services/Teams.services";
import { NextResponse } from "next/server";



export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    try {
        await connectDB();
        const teams = await getTeams(category);
        return NextResponse.json({ success: true, data: teams }, { status: 200 });
    } catch (error) {
        console.error("Error al obtener equipos:", error);
        return NextResponse.json({ success: false, error: "Error al obtener equipos" }, { status: 500 });
    }
}


export const POST = async (request: Request) => {
    try {
        await connectDB();
        const team = await request.json();
        console.log("TEAM BODY:", team);
        const response = await createTeam(team);
        if (!response) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Team already exists",
                },
                { status: 409 }
            );
        }

        return NextResponse.json({ success: true, data: response }, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json({ success: false, error: "Error creating team" }, { status: 500 });
    }
}