import { Module } from "@nestjs/common";
import { DummyController } from "@/dummy/dummy.controller";
import { DummyService } from "@/dummy/dummy.service";

@Module({
  imports: [],
  controllers: [DummyController],
  providers: [DummyService],
})
export class DummyModule {}
