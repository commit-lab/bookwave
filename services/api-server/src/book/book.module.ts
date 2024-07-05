import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from "@nestjs/common";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { AuthorModule } from "@/author/author.module";
import { ChapterModule } from "@/chapter/chapter.module";
import { chapterProviders } from "@/chapter/chapter.provider";
import { DbModule } from "../db/db.module";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { bookProviders } from "./book.provider";

@Module({
  imports: [DbModule, AuthorModule, ChapterModule],
  controllers: [BookController],
  providers: [BookService, ...bookProviders, ...chapterProviders],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BookController);
  }
}
