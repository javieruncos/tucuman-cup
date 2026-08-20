import { connectDB } from "@/lib/mongodb"
import { getStading } from "@/services/Stading.services";
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