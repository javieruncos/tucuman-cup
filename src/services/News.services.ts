import { News } from "@/models/News";
import "@/models/Team";

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
  const news = await News.create(data);
  return news.populate("team");
};