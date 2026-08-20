import { InferSchemaType, model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export type CategoryType = InferSchemaType<typeof CategorySchema>;

export const Category =
  models.Category ?? model("Category", CategorySchema);