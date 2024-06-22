import { Module } from "@nestjs/common";
import { type NestModule, type MiddlewareConsumer } from "@nestjs/common";
import { DummyController } from "@/dummy/dummy.controller";
import { DummyService } from "@/dummy/dummy.service";
import { AuthorModule } from "@/author/author.module";
import { AuthMiddleware } from "../middleware/auth.middleware";

@Module({
  imports: [AuthorModule],
  controllers: [DummyController],
  providers: [DummyService],
})
export class DummyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DummyController);
  }
}
