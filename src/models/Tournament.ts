import { InferSchemaType, model, models, Schema } from "mongoose";

const TournamentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    season: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    format: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "active", "finished"],
      default: "active",
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export type TournamentType = InferSchemaType<typeof TournamentSchema>;

export const Tournament =
  models.Tournament ?? model("Tournament", TournamentSchema);