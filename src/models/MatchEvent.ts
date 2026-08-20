import { InferSchemaType, model, models, Schema } from "mongoose";

const MatchEventSchema = new Schema(
  {
    match: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    type: {
      type: String,
      enum: ["goal", "yellow_card", "red_card", "substitution"],
      required: true,
    },

    minute: {
      type: Number,
      required: true,
      min: 1,
      max: 130,
    },

    additionalPlayer: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },
  },
  { timestamps: true }
);

export type MatchEventType = InferSchemaType<typeof MatchEventSchema>;

export const MatchEvent =
  models.MatchEvent ?? model("MatchEvent", MatchEventSchema);