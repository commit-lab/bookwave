import { type Mongoose, type Model } from "mongoose";
import { MONGO_CONNECTION } from "@/db/constants";
import { AuthorSchema } from "./schema/author.schema";
import { AUTHOR_MODEL } from "./author.constants";
import { type Author } from "./interfaces/author.interface";

export const authorProviders = [
  {
    provide: AUTHOR_MODEL,
    inject: [MONGO_CONNECTION],
    useFactory: (mongoose: Mongoose): Model<Author> => {
      return mongoose.model("Author", AuthorSchema);
    },
  },
];
