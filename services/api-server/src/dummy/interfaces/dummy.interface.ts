import { type Document } from "mongoose";

export interface Dummy extends Document {
  readonly _id: string;
  readonly foo: string;
  readonly bar: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
