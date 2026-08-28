import type { Team } from "@/types/teams";

export type NewsResponseType = {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
  team: Team | null;
  image?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateNewsInput = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
  image?: string;
  team?: string | null;
};

export type UpdateNewsInput = {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  date?: string;
  author?: string;
  readTime?: string;
  image?: string;
  team?: string | null;
};