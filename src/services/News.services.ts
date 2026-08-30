import { News } from "@/models/News";
import { Team } from "@/models/Team";
import type { UpdateNewsInput } from "@/types/news";

export const getAllNews = async () => {
  return News.find()
    .populate("team")
    .sort({
      date: -1,
    });
};

export const getNewsById = async (id: string) => {
  return News.findById(id).populate("team");
};


export const createNews = async (data: {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: Date;
  author?: string;
  readTime?: string;
  team?: string | null;
  image?: string;

}) => {
  // Validar team si se proporciona
  if (data.team && data.team !== null) {
    const teamExists = await Team.exists({ _id: data.team });
    if (!teamExists) {
      throw new Error("Equipo no encontrado");
    }
  }

  const news = await News.create(data);
  return news.populate("team");
};

export const updateNews = async (id: string, data: UpdateNewsInput) => {
  try {
    const news = await News.findById(id);
    if (!news) {
      return { success: false, error: "Noticia no encontrada" };
    }

    // Validar team si se proporciona
    if (data.team !== undefined) {
      if (data.team !== null) {
        const teamExists = await Team.exists({ _id: data.team });
        if (!teamExists) {
          return { success: false, error: "Equipo no encontrado" };
        }
      }
    }

    // Validar campos obligatorios si vienen
    if (data.title !== undefined && data.title.trim() === "") {
      return { success: false, error: "El título no puede estar vacío" };
    }
    if (data.excerpt !== undefined && data.excerpt.trim() === "") {
      return { success: false, error: "El extracto no puede estar vacío" };
    }
    if (data.content !== undefined && data.content.trim() === "") {
      return { success: false, error: "El contenido no puede estar vacío" };
    }
    if (data.category !== undefined && data.category.trim() === "") {
      return { success: false, error: "La categoría no puede estar vacía" };
    }

    // Convertir team a ObjectId si es string válido
    const updateData = { ...data };
    if (updateData.team !== undefined && updateData.team !== null) {
      // team ya es string, MongoDB lo convertirá
    }

    const response = await News.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Error al actualizar la noticia", error);
    return { success: false, error: "Error interno" };
  }
};

export const deleteNews = async (id: string) => {
  try {
    const news = await News.findById(id);
    if (!news) {
      return { success: false, error: "Noticia no encontrada" };
    }

    await News.findByIdAndDelete(id);

    return { success: true, data: {} };
  } catch (error) {
    console.error("Error al eliminar la noticia", error);
    return { success: false, error: "Error interno" };
  }
};