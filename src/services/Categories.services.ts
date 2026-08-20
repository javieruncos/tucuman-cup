import { Category, CategoryType } from "@/models/Category";

export const getCategories = async () => {
  try {
    const response = await Category.find();
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

export const createCategory = async (category: CategoryType) => {
  try {
    const response = await Category.create(category);
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
};

export const getCategoryId = async (slug: string): Promise<string | null> => {
  const category = await Category.findOne({ slug }).lean();
  return category ? String(category._id) : null;
};