import { InferSchemaType, model, models, Schema } from "mongoose";

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    founded: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

export type TeamType = InferSchemaType<typeof TeamSchema>;
export const Team = models.Team ?? model("Team", TeamSchema);