import { Category, CategoryType } from "@/models/Category";
import { Team } from "@/models/Team";
import { Match } from "@/models/Matches";
import type { UpdateCategoryInput } from "@/types/categories";

export const getCategories = async () => {
  try {
    const response = await Category.find();
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await Category.findById(id);
    return response;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};

export const getCategoryId = async (slug: string): Promise<string | null> => {
  const category = await Category.findOne({ slug }).lean();
  return category ? String(category._id) : null;
};

export const createCategory = async (category: CategoryType) => {
  try {
    const response = await Category.create(category);
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id: string, data: UpdateCategoryInput) => {
  try {
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return { success: false, error: "Categoría no encontrada" };
    }

    if (!data || Object.keys(data).length === 0) {
      return { success: false, error: "No hay campos para actualizar" };
    }

    // Validar name si viene
    if (data.name !== undefined && data.name.trim() === "") {
      return { success: false, error: "El nombre no puede estar vacío" };
    }

    // Validar slug si viene
    if (data.slug !== undefined && data.slug.trim() === "") {
      return { success: false, error: "El slug no puede estar vacío" };
    }

    // Verificar duplicados excluyendo el documento actual
    if (data.name || data.slug) {
      const name = data.name || existingCategory.name;
      const slug = data.slug || existingCategory.slug;

      const duplicate = await Category.findOne({
        $or: [{ name }, { slug }],
        _id: { $ne: id },
      });

      if (duplicate) {
        return {
          success: false,
          error: "Ya existe una categoría con ese nombre o slug",
        };
      }
    }

    const response = await Category.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true, runValidators: true }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Error interno" };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return { success: false, error: "Categoría no encontrada" };
    }

    const [teamsCount, matchesCount] = await Promise.all([
      Team.countDocuments({ category: id }),
      Match.countDocuments({ category: id }),
    ]);

    if (teamsCount > 0) {
      return {
        success: false,
        error: `No se puede eliminar la categoría. Tiene ${teamsCount} equipo(s) asociado(s).`,
        code: "TEAM_HAS_CATEGORY",
      };
    }

    if (matchesCount > 0) {
      return {
        success: false,
        error: `No se puede eliminar la categoría. Tiene ${matchesCount} partido(s) asociado(s).`,
        code: "MATCH_HAS_CATEGORY",
      };
    }

    await Category.findByIdAndDelete(id);

    return { success: true, data: {} };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Error interno" };
  }
};