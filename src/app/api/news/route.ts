import { NextResponse } from "next/server";
import { createNews, getAllNews } from "@/services/News.services";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/models/Team";


export async function GET() {
  try {
    await connectDB();
    const news = await getAllNews();

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error al obtener las noticias:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener las noticias",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log("BODY:", body);

    // Validar team si se proporciona
    if (body.team && body.team !== null) {
      const teamExists = await Team.exists({ _id: body.team });
      if (!teamExists) {
        return NextResponse.json(
          {
            success: false,
            error: "Equipo no encontrado",
          },
          { status: 404 }
        );
      }
    }

    const news = await createNews({
      title: body.title,
      excerpt: body.excerpt,
      category: body.category,
      date: new Date(body.date),
      author: body.author,
      readTime: body.readTime,
      team: body.team ?? null,
      image: body.image,
      content: body.content,
    });

    return NextResponse.json(
      {
        success: true,
        data: news,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la noticia:", error);

    if (error instanceof Error && error.message === "Equipo no encontrado") {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error al crear la noticia",
      },
      { status: 500 }
    );
  }
}