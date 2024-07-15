import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DummyService } from "@/dummy/dummy.service";
import {
  CreateDummyDto,
  DummyDto,
  UpdateDummyDto,
} from "@/dummy/dto/dummy.dto";
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
  async fetchAllDumies(): Promise<DummyDto[]> {
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
  @Get("/:dummyId")
  async fetchOne(@Param("dummyId") dummyId: string): Promise<DummyDto> {
    try {
      return this.dummyService.fetchOneDummy(dummyId);
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

  @ApiOkResponse({
    type: DummyDto,
  })
  @Put("/:dummyId")
  async updateOne(
    @Param("dummyId") dummyId: string,
    @Body() UpdateDummyRequestBody: UpdateDummyDto
  ): Promise<DummyDto | null> {
    try {
      return this.dummyService.updateDummy(dummyId, UpdateDummyRequestBody);
    } catch (err: unknown) {
      logErrorAndMaybeThrowInternalServerError(err, "Unable to update dummy");
    }
  }
}
