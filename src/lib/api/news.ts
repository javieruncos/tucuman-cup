import type { NewsResponseType, CreateNewsInput, UpdateNewsInput } from "@/types/news";

export const fetchNews = async (): Promise<NewsResponseType[]> => {
  const response = await fetch("/api/news");

  if (!response.ok) {
    throw new Error("Error al obtener las noticias");
  }

  const result = await response.json();

  return result.data;
};

export const fetchNewsById = async (id: string): Promise<NewsResponseType> => {
  const response = await fetch(`/api/news/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener la noticia");
  }

  const result = await response.json();

  return result.data;
};

export const createNews = async (
  news: CreateNewsInput
): Promise<NewsResponseType> => {
  const response = await fetch("/api/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(news),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al crear la noticia");
  }

  return data.data;
};

export const updateNews = async (
  id: string,
  data: UpdateNewsInput
): Promise<NewsResponseType> => {
  const response = await fetch(`/api/news/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al actualizar la noticia");
  }

  const result = await response.json();
  return result.data;
};

export const deleteNews = async (id: string): Promise<void> => {
  const response = await fetch(`/api/news/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al eliminar la noticia");
  }
};