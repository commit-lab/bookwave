import { type Types, type Document } from "mongoose";

export interface BookDocument extends Document {
  readonly _id: string;
  readonly title: string;
  readonly handle: string;
  readonly author: Types.ObjectId;
  readonly state: string;
  readonly chapters: [Types.ObjectId];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
