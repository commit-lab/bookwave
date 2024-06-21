import { Model } from "mongoose";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { type Chapter } from "@/chapter/interfaces/chapter.interface";
import { type CreateChapterDto } from "@/chapter/dto/create-chapter.dto";
import { CHAPTER_MODEL } from "./chapter.constants";
import { type UpdateChapterDto } from "./dto/update-chapter.dto";

@Injectable()
export class ChapterService {
  constructor(
    @Inject(CHAPTER_MODEL)
    private readonly chapterModel: Model<Chapter>
  ) {}

  // Create new Chapter service:
  async createChapter(CreateChapterDto: CreateChapterDto): Promise<Chapter> {
    const newChapter = await this.chapterModel.create(CreateChapterDto);
    return newChapter.save();
  }

  // Update existing Chapter service:
  async updateChapter(
    chapterId: string,
    UpdateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    const updatedChapter = await this.chapterModel.findByIdAndUpdate(
      chapterId,
      UpdateChapterDto,
      { new: true }
    );
    if (!updatedChapter) {
      throw new NotFoundException(
        `Chapter with ChapterId: ${chapterId} not found`
      );
    }
    return updatedChapter;
  }

  // Delete existing Chapter service:
  async deleteChapter(ChapterId: string): Promise<Chapter> {
    const deletedChapter = await this.chapterModel.findByIdAndDelete(ChapterId);
    if (!deletedChapter) {
      throw new NotFoundException(
        `Chapter with ChapterId: ${ChapterId} not found`
      );
    }
    return deletedChapter;
  }

  // Fetch a single Chapter service:
  async getOneChapter(ChapterId: string): Promise<Chapter> {
    const chapter = await this.chapterModel.findById(ChapterId).exec();
    if (!chapter) {
      throw new NotFoundException(
        `Chapter with ChapterId: ${ChapterId} not found`
      );
    }
    return chapter;
  }

  // Fetch all Chapters belonging to a Book service:
}
