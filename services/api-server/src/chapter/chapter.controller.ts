import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotImplementedException,
  Put,
  Delete,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ChapterService } from "@/chapter/chapter.service";
import { ChapterDto } from "@/chapter/dto/chapter.dto";
import { UpdateChapterDto } from "@/chapter/dto/update-chapter.dto";
import { CreateChapterDto } from "@/chapter/dto/create-chapter.dto";
import { DeletedChapterResponseDto } from "@/chapter/dto/deleted-chapter-response.dto";

@ApiBearerAuth()
@ApiTags("chapters")
@Controller("books/:bookId/chapters")
export class ChapterController {
  private logger = new Logger("ChapterController");
  constructor(private readonly chapterService: ChapterService) {}

  @ApiOkResponse({
    description: "Chapter successfully found.",
    type: ChapterDto,
  })
  @Get("/:chapterNumber")
  async getOne(
    @Param("bookId") bookId: string,
    @Param("chapterNumber") chapterNumber: number
  ) {
    try {
      this.logger.log(
        `Retrieving chapter with chapter number: ${chapterNumber.toString()} for book with book id: ${bookId}.`
      );
      const chapter = await this.chapterService.findOne(bookId, chapterNumber);
      return chapter;
    } catch {
      this.logger.error(
        `Failed to get chapter with chapter number: ${chapterNumber.toString()} for book with book id: ${bookId}.`
      );
      throw new NotFoundException(
        `Chapter with chapter number: ${chapterNumber.toString()} not found.`
      );
    }
  }

  @ApiOkResponse({
    description: "Chapter successfully created.",
    type: ChapterDto,
  })
  @Post()
  async createOne(
    @Param("bookId") bookId: string,
    @Body() createChapterDto: CreateChapterDto
  ): Promise<ChapterDto> {
    try {
      this.logger.verbose(
        `Creating a new chapter for book with book id: ${bookId}. Data: ${JSON.stringify(createChapterDto)}.`
      );
      const createdChapter = await this.chapterService.create(
        createChapterDto,
        bookId
      );
      return createdChapter;
    } catch {
      this.logger.error(
        `Failed to create chapter for book with book id: ${bookId}. Data: ${JSON.stringify(createChapterDto)}. `
      );
      throw new NotImplementedException("Failed to create chapter.");
    }
  }

  @ApiOkResponse({
    description: "Chapter successfully updated.",
    type: ChapterDto,
  })
  @Put("/:chapterId")
  async updateOne(
    @Param("chapterId") chapterId: string,
    @Body() updateChapterDto: UpdateChapterDto
  ): Promise<ChapterDto> {
    try {
      this.logger.log(`Updating chapter with chapter id: ${chapterId}.`);
      const updatedBook = await this.chapterService.updateOne(
        chapterId,
        updateChapterDto
      );
      return updatedBook;
    } catch {
      this.logger.error(
        `Failed to update chapter with chapter id: ${chapterId}. Data: ${JSON.stringify(updateChapterDto)}. `
      );
      throw new NotFoundException(
        `Chapter with chapter id: ${chapterId} not found.`
      );
    }
  }

  @ApiOkResponse({
    description: "Chapter successfully deleted.",
    type: DeletedChapterResponseDto,
  })
  @Delete("/:chapterId")
  async deleteChapter(
    @Param("chapterId") chapterId: string
  ): Promise<DeletedChapterResponseDto> {
    try {
      const deletedChapterCount =
        await this.chapterService.deleteOne(chapterId);
      return deletedChapterCount;
    } catch {
      this.logger.error(
        `Failed to delete chapter with chapter id: ${chapterId}. `
      );
      throw new NotFoundException(
        `Chapter with chapter id: ${chapterId} not found.`
      );
    }
  }
}
