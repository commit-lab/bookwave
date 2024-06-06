import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DummyService } from "@/dummy/dummy.service";
import { DummyDto } from "@/dummy/dto/dummy.dto";
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
}
