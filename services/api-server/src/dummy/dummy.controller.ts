import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DummyService } from "@/dummy/dummy.service";
import { CreateDummyDto, DummyDto } from "@/dummy/dto/dummy.dto";
import { type Dummy } from "@/dummy/interfaces/dummy.interface";
import { logErrorAndMaybeThrowInternalServerError } from "@/common/exception";

@ApiBearerAuth()
@ApiTags("dummy")
@Controller("dummy")
export class DummyController {
  constructor(private dummyService: DummyService) {}

  @ApiOkResponse({
    type: [DummyDto],
  })
  @Get()
  async fetchAllDumies(): Promise<Dummy[]> {
    try {
      return this.dummyService.fetchDummies();
    } catch (err: unknown) {
      logErrorAndMaybeThrowInternalServerError(
        err,
        "Unable to fetch all dummies"
      );
    }
  }

  @ApiOkResponse({
    type: DummyDto,
  })
  @Post()
  async createOne(@Body() body: CreateDummyDto): Promise<Dummy> {
    try {
      return this.dummyService.createDummy(body);
    } catch (err: unknown) {
      logErrorAndMaybeThrowInternalServerError(err, "Unable to create dummy");
    }
  }
}
