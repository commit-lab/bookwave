import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { ChapterController } from "./chapter.controller";
import { ChapterService } from "./chapter.service";
import { chapterProviders } from "./chapter.provider";

@Module({
  imports: [DbModule],
  controllers: [ChapterController],
  providers: [ChapterService, ...chapterProviders],
})
export class ChapterModule {}
