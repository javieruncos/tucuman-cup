import { connectDB } from "@/lib/mongodb"
import { createStanding, deleteStanding, getStading, updateStanding } from "@/services/Stading.services";
import { NextResponse } from "next/server";



export const GET = async () => {
    try {
       await connectDB()
       
       const standings = await getStading();

       return NextResponse.json({sucess:true,data:standings},{status:200})
       
    } catch (error) {
       console.log("Error al obtener standings", error);
       return NextResponse.json({success:false,error:"Error al obtener standings"},{status:500})
    }
}
    

export const POST = async (request: Request) => {
    try {
        await connectDB();
        const standing = await request.json();
        const response = await createStanding(standing);
        return NextResponse.json({ success: true, data: response }, { status: 201 });
    } catch (error) {
        console.error("Error creating standing:", error);
        return NextResponse.json({ success: false, error: "Error al crear standing" }, { status: 500 });
    }
}


export const DELETE = async (request: Request) => {
    try {
        await connectDB();
        const { id } = await request.json();
        const response = await deleteStanding(id);
        return NextResponse.json({ success: true, data: response }, { status: 200 });
    } catch (error) {
        console.error("Error deleting standing:", error);
        return NextResponse.json({ success: false, error: "Error al eliminar standing" }, { status: 500 });
    }
}

export const PUT = async (request: Request) => {
    try {
        await connectDB();
        const { id, standing } = await request.json();
        const response = await updateStanding(id, standing);
        return NextResponse.json({ success: true, data: response }, { status: 200 });
    } catch (error) {
        console.error("Error updating standing:", error);
        return NextResponse.json({ success: false, error: "Error al actualizar standing" }, { status: 500 });
    }
}