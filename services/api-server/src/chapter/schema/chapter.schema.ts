import { Schema } from "mongoose";
import { type Chapter } from "../interfaces/chapter.interface";

export const ChapterSchema = new Schema<Chapter>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
