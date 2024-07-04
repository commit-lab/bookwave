import { type Mongoose, type Model } from "mongoose";
import { MONGO_CONNECTION } from "@/db/constants";
import { BookSchema } from "./schema/book.schema";
import { BOOK_MODEL } from "./book.constants";
import { type BookDocument } from "./interfaces/book.interface";

export const bookProviders = [
  {
    provide: BOOK_MODEL,
    inject: [MONGO_CONNECTION],
    useFactory: (mongoose: Mongoose): Model<BookDocument> => {
      return mongoose.model("Book", BookSchema);
    },
  },
];
