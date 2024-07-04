import { type Mongoose, type Model } from "mongoose";
import { MONGO_CONNECTION } from "@/db/constants";
import { ChapterSchema } from "./schema/chapter.schema";
import { CHAPTER_MODEL } from "./chapter.constants";
import { type ChapterDocument } from "./interfaces/chapter.interface";

export const chapterProviders = [
  {
    provide: CHAPTER_MODEL,
    inject: [MONGO_CONNECTION],
    useFactory: (mongoose: Mongoose): Model<ChapterDocument> => {
      return mongoose.model("Chapter", ChapterSchema);
    },
  },
];
