import { type Mongoose, type Model } from "mongoose";
import { ChapterSchema } from "./schema/chapter.schema";
import { CHAPTER_MODEL } from "./chapter.constants";
import { type ChapterDocument } from "./interfaces/chapter.interface";
import { MONGO_CONNECTION } from "@/db/constants";

export const chapterProviders = [
  {
    provide: CHAPTER_MODEL,
    inject: [MONGO_CONNECTION],
    useFactory: (mongoose: Mongoose): Model<ChapterDocument> => {
      return mongoose.model("Chapter", ChapterSchema);
    },
  },
];
