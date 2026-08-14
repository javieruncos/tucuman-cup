import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    homeTeam: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    awayTeam: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "live", "finished"],
      default: "scheduled",
    },

    homeScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    awayScore: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Match =
  mongoose.models.Match || mongoose.model("Match", matchSchema);