import { Schema } from "mongoose";
import { type BookDocument } from "../interfaces/book.interface";

export const BookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    handle: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    state: { type: String, enum: ["Draft", "Published"], default: "Draft" },
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  },
  { timestamps: true }
);
