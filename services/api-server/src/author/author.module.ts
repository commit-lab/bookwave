import {
  Module,
  type NestModule,
  type MiddlewareConsumer,
} from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { authorProviders } from "./author.provider";

@Module({
  imports: [DbModule],
  controllers: [AuthorController],
  providers: [AuthorService, ...authorProviders],
  exports: [AuthorService],
})
export class AuthorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AuthorController);
  }
}
