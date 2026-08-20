import { connectDB } from "@/lib/mongodb";
import { createCategory, getCategories } from "@/services/Categories.services";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const categories = await getCategories();
    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching categories" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const category = await request.json();
    const response = await createCategory(category);
    return NextResponse.json(
      { success: true, data: response },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, error: "Error creating category" },
      { status: 500 }
    );
  }
};