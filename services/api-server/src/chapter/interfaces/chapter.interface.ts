import { type Document } from "mongoose";

export interface ChapterDocument extends Document {
  readonly title: string;
  readonly content: string;
}
