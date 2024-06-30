import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { ChapterController } from "./chapter.controller";
// import { ChapterService } from "./chapter.service";
import { chapterProviders } from "./chapter.provider";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { AuthorModule } from "@/author/author.module";
import { BookService } from "@/book/book.service";
import { bookProviders } from "@/book/book.provider";
import { ChapterService } from "@/chapter/chapter.service";

@Module({
  imports: [DbModule, AuthorModule],
  controllers: [ChapterController],
  providers: [
    ChapterService,
    ...chapterProviders,
    BookService,
    ...bookProviders,
  ],
})
export class ChapterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ChapterController);
  }
}
