import { type Document } from "mongoose";

export interface Chapter extends Document {
  readonly title: string;
  readonly content: string;
}
