import type { Category, CreateCategoryInput, UpdateCategoryInput } from "@/types/categories";

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

export const fetchCategoryById = async (id: string): Promise<Category> => {
  const response = await fetch(`/api/categories/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error fetching category");
  }

  return data.data;
};

export const createCategory = async (category: CreateCategoryInput): Promise<Category> => {
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

export const updateCategory = async (id: string, updateData: UpdateCategoryInput): Promise<Category> => {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error updating category");
  }

  const result = await response.json();
  return result.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error deleting category");
  }
};