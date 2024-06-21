import { type Mongoose, type Model } from "mongoose";
import { ChapterSchema } from "@/chapter/schema/chapter.schema";
import { MONGO_CONNECTION } from "@/db/constants";
import { CHAPTER_MODEL } from "./chapter.constants";
import { type Chapter } from "./interfaces/chapter.interface";

export const chapterProviders = [
  {
    provide: CHAPTER_MODEL,
    inject: [MONGO_CONNECTION],
    useFactory: (mongoose: Mongoose): Model<Chapter> => {
      return mongoose.model("Chapter", ChapterSchema);
    },
  },
];
