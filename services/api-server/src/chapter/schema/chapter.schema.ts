import { Schema } from "mongoose";
import { type ChapterDocument } from "@/chapter/interfaces/chapter.interface";

export const ChapterSchema = new Schema<ChapterDocument>(
  {
    title: { type: String, required: true },
    content: { type: String },
  },
  { timestamps: true }
);
