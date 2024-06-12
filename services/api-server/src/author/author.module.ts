import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { authorProviders } from "./author.provider";

@Module({
  imports: [DbModule],
  controllers: [AuthorController],
  providers: [AuthorService, ...authorProviders],
})
export class AuthorModule {}
