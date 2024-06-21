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
} from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { ChapterService } from "./chapter.service";
import { type Chapter } from "./interfaces/chapter.interface";
import { ChapterDto } from "./dto/chapter-dto";

@ApiTags("chapters")
@Controller(":bookId/chapters")
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  // Create a new Chapter => /:bookId/chapters
  @ApiResponse({
    status: 201,
    description: "The Chapter has been successfully created.",
  })
  @Post()
  async createChapter(@Body() createChapterDto: CreateChapterDto) {
    try {
      await this.chapterService.createChapter(createChapterDto);
    } catch {
      throw new NotImplementedException();
    }
  }

  // Update an existing Chapter => /:bookId/chapters/:chapterId
  @Put("/:chapterId")
  async updateChapter(
    @Param("ChapterId") ChapterId: string,
    @Body() updateChapterDto: UpdateChapterDto
  ) {
    try {
      const updatedChapter = await this.chapterService.updateChapter(
        ChapterId,
        updateChapterDto
      );
      return updatedChapter;
    } catch {
      throw new NotFoundException(
        `Chapter with ChapterId: ${ChapterId} not found`
      );
    }
  }

  // Delete a Chapter => /:bookId/chapters/:chapterId
  @ApiOkResponse({
    description: "Chapter successfully deleted",
  })
  @ApiNotFoundResponse({
    description: "Chapter not found",
  })
  @Delete("/:chapterId")
  async deleteChapter(@Param("ChapterId") ChapterId: string) {
    try {
      await this.chapterService.deleteChapter(ChapterId);
    } catch {
      throw new NotFoundException(
        `Chapter with ChapterId: ${ChapterId} not found`
      );
    }
  }

  // Get single Chapter belonging to a Book => /:bookId/chapters/:chapterId
  @ApiOkResponse({
    type: [ChapterDto],
  })
  @Get("/:chapterId")
  async getOneChapter(@Param("ChapterId") ChapterId: string): Promise<Chapter> {
    try {
      const Chapter = await this.chapterService.getOneChapter(ChapterId);
      return Chapter;
    } catch {
      throw new NotFoundException(
        `Chapter with ChapterId: ${ChapterId} not found`
      );
    }
  }
  // Get all Chapters belonging to a Book => /:bookId/chapters
}
