import { NextResponse } from "next/server";
import { createNews, getAllNews } from "@/services/News.services";
import { connectDB } from "@/lib/mongodb";


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
    const body = await request.json();
    console.log("BODY:", body);

    const news = await createNews({
      title: body.title,
      excerpt: body.excerpt,
      category: body.category,
      date: new Date(body.date),
      author: body.author,
      readTime: body.readTime,
      team: body.team ?? null,
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

    return NextResponse.json(
      {
        success: false,
        message: "Error al crear la noticia",
      },
      { status: 500 }
    );
  }
}