import { type Document } from "mongoose";
import { type Author } from "@/author/interfaces/author.interface";
import { type Chapter } from "@/chapter/interfaces/chapter.interface";

export interface BookDocument extends Document {
  readonly title: string;
  readonly handle: string;
  readonly author: Author["_id"];
  readonly state: string;
  readonly chapters: [Chapter["_id"]];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
