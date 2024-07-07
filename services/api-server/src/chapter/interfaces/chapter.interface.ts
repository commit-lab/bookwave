import { type Document } from "mongoose";

export interface ChapterDocument extends Document {
  readonly _id: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
