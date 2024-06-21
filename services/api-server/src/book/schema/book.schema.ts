import { Schema } from "mongoose";
import { type Book } from "../interfaces/book.interface";

export const BookSchema = new Schema<Book>(
  {
    title: { type: String, required: true },
    handle: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    state: { type: String, enum: ["Draft", "Published"], default: "Draft" },
    chapterIds: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  },
  { timestamps: true }
);
