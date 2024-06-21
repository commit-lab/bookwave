import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { bookProviders } from "./book.provider";

@Module({
  imports: [DbModule],
  controllers: [BookController],
  providers: [BookService, ...bookProviders],
})
export class BookModule {}
