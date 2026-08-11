import { connectDB } from "@/lib/mongodb";
import { Team } from "@/models/Team";
import { createTeam } from "@/services/Teams.services";
import { NextResponse } from "next/server";



export const GET = async () => {
    try {
        await connectDB();
        const teams = await Team.find();
        return NextResponse.json({ success: true, data: teams }, { status: 200 });
    } catch (error) {
        console.error("Error fetching teams:", error);
        return NextResponse.json({ success: false, error: "Error fetching teams" }, { status: 500 });
    }
}


export const POST = async (request: Request) => {
    try {
        await connectDB();
        const team = await request.json();
        const response = await createTeam(team);
        return NextResponse.json({ success: true, data: response }, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json({ success: false, error: "Error creating team" }, { status: 500 });
    }
}