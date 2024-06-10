import { Mongoose, connect } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { args } from "../common/args";
import { MONGO_CONNECTION } from "./constants";

// Instead of using the supported @nestjs/mongoose package, we use a custom
// provider instead. This allows us to prevent a connection from being made
// when the API client is generated during the build step. See
// https://docs.nestjs.com/recipes/mongodb for more information on this setup.
export const databaseProviders = [
  {
    provide: MONGO_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<Mongoose> => {
      if (
        configService.get("NODE_ENV") === "test" ||
        args.gen_api_client === true
      ) {
        // Return an empty Mongoose object. We don't want a Mongoose object with
        // a connection as this will prevent the gen-open-api call from
        // finishing.
        return new Mongoose();
      }
      return await connect(configService.get("DB_CONNECTION_STRING") ?? "");
    },
  },
];
