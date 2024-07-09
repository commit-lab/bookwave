import { type Mongoose, type Model } from "mongoose";
import { DummySchema } from "./schema/dummy.schema";
import { DUMMY_MODEL } from "./dummy.constants";
import { type Dummy } from "./interfaces/dummy.interface";
import { MONGO_CONNECTION } from "@/db/constants";

export const dummyProviders = [
  {
    provide: DUMMY_MODEL,
    inject: [MONGO_CONNECTION],
    useFactory: (mongoose: Mongoose): Model<Dummy> => {
      return mongoose.model("Dummy", DummySchema);
    },
  },
];
