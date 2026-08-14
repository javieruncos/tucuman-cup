import type { NewsResponseType } from "@/types/news";

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
