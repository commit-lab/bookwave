import { type Model, Schema, type Types, model } from "mongoose";
import { ChapterSchema, type ChapterType } from "./chapter";

export enum PublishState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface BookType {
  title: string;
  handle: string;
  authorId: Types.ObjectId;
  publishedAt: Date;
  state: PublishState;
  chapters: ChapterType[];
}

export type BookModel = Model<BookType>;

export const BookSchema: Schema = new Schema<BookType, BookModel>({
  title: { type: String, required: true },
  handle: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, required: true },
  publishedAt: { type: Date },
  state: { type: String, enum: PublishState, default: PublishState.DRAFT },
  chapters: { type: [ChapterSchema] },
});

export const Book: BookModel = model<BookType, BookModel>("Book", BookSchema);
