import { InferSchemaType, model, models, Schema } from "mongoose";

const StandingSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    position: {
      type: Number,
      required: true,
    },

    played: {
      type: Number,
      required: true,
      default: 0,
    },

    won: {
      type: Number,
      required: true,
      default: 0,
    },

    drawn: {
      type: Number,
      required: true,
      default: 0,
    },

    lost: {
      type: Number,
      required: true,
      default: 0,
    },

    goalsFor: {
      type: Number,
      required: true,
      default: 0,
    },

    goalsAgainst: {
      type: Number,
      required: true,
      default: 0,
    },

    goalDifference: {
      type: Number,
      required: true,
      default: 0,
    },

    points: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export type StandingType = InferSchemaType<typeof StandingSchema>;

export const Standing =
  models.Standing ?? model("Standing", StandingSchema);