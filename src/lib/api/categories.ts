import type { Category } from "@/types/categories";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch("/api/categories");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error fetching categories");
    }
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (category: {
  name: string;
  slug: string;
}): Promise<Category> => {
  try {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error creating category");
    }
    return data.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};