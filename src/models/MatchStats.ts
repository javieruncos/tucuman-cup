import mongoose, { Schema } from "mongoose";

const matchStatsSchema = new Schema(
  {
    match: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
      unique: true,
    },

    home: {
      possession: {
        type: Number,
        default: 0,
      },
      shots: {
        type: Number,
        default: 0,
      },
      shotsOnTarget: {
        type: Number,
        default: 0,
      },
    },

    away: {
      possession: {
        type: Number,
        default: 0,
      },
      shots: {
        type: Number,
        default: 0,
      },
      shotsOnTarget: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const MatchStats =
  mongoose.models.MatchStats ||
  mongoose.model("MatchStats", matchStatsSchema);