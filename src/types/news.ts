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
  createdAt: string;
  updatedAt: string;
};
