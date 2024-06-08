import { type Model, Schema, model } from "mongoose";

export interface ChapterType {
  title: string;
  content: string;
}

export type ChapterModel = Model<ChapterType>;

export const ChapterSchema: Schema = new Schema<ChapterType, ChapterModel>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const Chapter: ChapterModel = model<ChapterType, ChapterModel>(
  "Chapter",
  ChapterSchema
);
