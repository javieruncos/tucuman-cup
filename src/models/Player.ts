import { InferSchemaType, model, models, Schema } from "mongoose";

const PlayerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: Number,
      required: true,
      min: 1,
    },

    position: {
      type: String,
      enum: ["GK", "DEF", "MID", "FWD"],
      required: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    photo: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export type PlayerType = InferSchemaType<typeof PlayerSchema>;

export const Player = models.Player ?? model("Player", PlayerSchema);