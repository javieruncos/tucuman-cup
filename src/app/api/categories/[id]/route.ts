import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getCategoryById, updateCategory, deleteCategory } from "@/services/Categories.services";

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "ID de categoría inválido" },
        { status: 400 }
      );
    }

    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category }, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "ID de categoría inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "No hay campos para actualizar" },
        { status: 400 }
      );
    }

    const forbiddenFields = ["_id", "createdAt", "updatedAt"];
    for (const field of forbiddenFields) {
      if (field in body) {
        return NextResponse.json(
          { success: false, error: `No se puede modificar ${field}` },
          { status: 400 }
        );
      }
    }

    if (body.name !== undefined && body.name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "El nombre no puede estar vacío" },
        { status: 400 }
      );
    }

    if (body.slug !== undefined && body.slug.trim() === "") {
      return NextResponse.json(
        { success: false, error: "El slug no puede estar vacío" },
        { status: 400 }
      );
    }

    const result = await updateCategory(id, body);

    if (!result.success) {
      const errorMessage = result.error || "";
      const status = errorMessage.includes("no encontrada") ? 404 :
                     errorMessage.includes("vacío") ? 400 :
                     errorMessage.includes("existe") ? 409 : 400;
      return NextResponse.json({ success: false, error: result.error }, { status });
    }

    return NextResponse.json({ success: true, data: result.data }, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "ID de categoría inválido" },
        { status: 400 }
      );
    }

    const result = await deleteCategory(id);

    if (!result.success) {
      const errorMessage = result.error || "";
      if (result.code === "TEAM_HAS_CATEGORY") {
        return NextResponse.json({ success: false, error: errorMessage }, { status: 409 });
      }
      if (result.code === "MATCH_HAS_CATEGORY") {
        return NextResponse.json({ success: false, error: errorMessage }, { status: 409 });
      }
      if (errorMessage.includes("no encontrada")) {
        return NextResponse.json({ success: false, error: errorMessage }, { status: 404 });
      }
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};