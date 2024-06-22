import { type Document } from "mongoose";

export interface Author extends Document {
  readonly firebaseUid: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly handle: string;
}
