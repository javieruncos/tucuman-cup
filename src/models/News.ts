import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface INews extends Document {
  title: string;
  excerpt: string;
  category: string;
  date: Date;
  author?: string;
  readTime?: string;
  team?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    author: {
      type: String,
      trim: true,
    },

    readTime: {
      type: String,
      trim: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema);