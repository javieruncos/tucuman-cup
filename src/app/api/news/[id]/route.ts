import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getNewsById } from "@/services/News.services";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const { id } = await params;

    const news = await getNewsById(id);

    if (!news) {
      return NextResponse.json(
        {
          success: false,
          error: "Noticia no encontrada",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error al obtener noticia", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener noticia",
      },
      { status: 500 }
    );
  }
};
