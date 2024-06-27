import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { bookProviders } from "./book.provider";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { AuthorModule } from "@/author/author.module";

@Module({
  imports: [DbModule, AuthorModule],
  controllers: [BookController],
  providers: [BookService, ...bookProviders],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BookController);
  }
}
