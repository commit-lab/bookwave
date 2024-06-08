import { type Model, Schema, model } from "mongoose";

export interface Author {
  firstName: string;
  lastName: string;
  handle: string;
}

export type AuthorModelType = Model<Author>;

export const AuthorSchema: Schema = new Schema<Author, AuthorModelType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  handle: { type: String, required: true },
});

export const AuthorModel: AuthorModelType = model<Author, AuthorModelType>(
  "Author",
  AuthorSchema,
);
