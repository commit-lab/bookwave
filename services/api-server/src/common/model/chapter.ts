import { type Model, Schema, model } from "mongoose";

export interface Chapter {
  title: string;
  content: string;
}

export type ChapterModelType = Model<Chapter>;

export const ChapterSchema: Schema = new Schema<Chapter, ChapterModelType>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const ChapterModel: ChapterModelType = model<Chapter, ChapterModelType>(
  "Chapter",
  ChapterSchema,
);
