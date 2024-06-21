import { type Document, type Types } from "mongoose";

export interface Book extends Document {
  readonly title: string;
  readonly handle: string;
  readonly authorId: Types.ObjectId;
  readonly state: string;
  readonly chapterIds: [Types.ObjectId];
  readonly timestamps: boolean;
}
