import { type Types, type Document } from "mongoose";
import { type ChapterDocument } from "@/chapter/interfaces/chapter.interface";

export interface BookDocument extends Document {
  readonly _id: string;
  readonly title: string;
  readonly handle: string;
  readonly author: Types.ObjectId;
  readonly state: string;
  readonly chapters: [ChapterDocument];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
