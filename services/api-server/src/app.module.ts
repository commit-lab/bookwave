import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DummyModule } from "@/dummy/dummy.module";
import { InitModule } from "@/init/init.module";
import { AuthorModule } from "@/author/author.module";
import { BookModule } from "./book/book.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    InitModule,
    DummyModule,
    AuthorModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
