import { Model, Schema, model } from 'mongoose';

export interface IAuthor {
  firstName: string;
  lastName: string;
  handle: string;
}

export type AuthorModel = Model<IAuthor>;

export const AuthorSchema : Schema = new Schema<IAuthor, AuthorModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  handle: { type: String, required: true},
});

export const Author : AuthorModel = model<IAuthor, AuthorModel>('Author', AuthorSchema);