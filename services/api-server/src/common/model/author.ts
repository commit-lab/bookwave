import { type Model, Schema, model } from "mongoose";

export interface AuthorType {
  firstName: string;
  lastName: string;
  handle: string;
}

export type AuthorModel = Model<AuthorType>;

export const AuthorSchema: Schema = new Schema<AuthorType, AuthorModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  handle: { type: String, required: true },
});

export const Author: AuthorModel = model<AuthorType, AuthorModel>(
  "Author",
  AuthorSchema
);
