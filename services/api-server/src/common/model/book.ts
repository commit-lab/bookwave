import { type Model, Schema, type Types, model } from "mongoose";
import { ChapterSchema, type Chapter } from "./chapter";

export enum PublishState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface Book {
  title: string;
  handle: string;
  authorId: Types.ObjectId;
  publishedAt: Date;
  state: PublishState;
  chapters: Chapter[];
}

export type BookModelType = Model<Book>;

export const BookSchema: Schema = new Schema<Book, BookModelType>({
  title: { type: String, required: true },
  handle: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, required: true },
  publishedAt: { type: Date },
  state: { type: String, enum: PublishState, default: PublishState.DRAFT },
  chapters: { type: [ChapterSchema] },
});

export const BookModel: BookModelType = model<Book, BookModelType>(
  "Book",
  BookSchema,
);
