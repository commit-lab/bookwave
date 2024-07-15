import { Schema } from "mongoose";
import { type Dummy } from "@/dummy/interfaces/dummy.interface";

export const DummySchema = new Schema<Dummy>(
  {
    foo: { type: String, required: true },
    bar: { type: String, required: true },
    content: { type: String },
  },
  { timestamps: true }
);
