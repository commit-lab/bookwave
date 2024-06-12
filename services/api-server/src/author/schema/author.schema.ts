import { Schema } from "mongoose";
import { type Author } from "../interfaces/author.interface";

export const AuthorSchema = new Schema<Author>({
  firstName: String,
  lastName: String,
  handle: String,
});
