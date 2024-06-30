import { Model } from "mongoose";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { isNullOrUndefined } from "@bookwave/utils";
import { BOOK_MODEL } from "../book/book.constants";
import { type BookDocument } from "@/book/interfaces/book.interface";
import { type ChapterDocument } from "@/chapter/interfaces/chapter.interface";
import { CHAPTER_MODEL } from "@/chapter/chapter.constants";
import { ChapterDto } from "@/chapter/dto/chapter.dto";
import { type UpdateChapterDto } from "@/chapter/dto/update-chapter.dto";
import { type CreateChapterDto } from "@/chapter/dto/create-chapter.dto";
import { DeletedChapterResponseDto } from "@/chapter/dto/deleted-chapter-response.dto";

@Injectable()
export class ChapterService {
  constructor(
    @Inject(BOOK_MODEL)
    private readonly bookModel: Model<BookDocument>,

    @Inject(CHAPTER_MODEL)
    private readonly chapterModel: Model<ChapterDocument>
  ) {}

  // Find chapter by {chapterNumber}.

  async findOne(bookId: string, chapterNumber: number): Promise<ChapterDto> {
    const book = await this.bookModel
      .findOne({ _id: bookId })
      .populate({ path: "chapters", model: "Chapter" })
      .exec();
    if (isNullOrUndefined(book)) {
      throw new NotFoundException(`Book with bookId: ${bookId} not found.`);
    }
    const chapterIndex = chapterNumber - 1;
    const chapter = book.chapters[chapterIndex];
    if (isNullOrUndefined(chapter)) {
      throw new NotFoundException(
        `Chapter with chapter number: ${chapterNumber.toString()} not found.`
      );
    }
    const chapterResponse = new ChapterDto();
    chapterResponse.id = chapter._id;
    chapterResponse.title = chapter.title;
    chapterResponse.content = chapter.content;
    return chapterResponse;
  }

  // Create a chapter.

  async create(
    createChapterDto: CreateChapterDto,
    bookId: string
  ): Promise<ChapterDto> {
    const createdChapter = await this.chapterModel.create({
      ...createChapterDto,
    });

    await this.bookModel.updateOne(
      // push created chapter into chapter array of book document
      { _id: bookId },
      { $push: { chapters: createdChapter } }
    );

    const createdChapterResponse = new ChapterDto();

    createdChapterResponse.title = createdChapter.title;
    return createdChapterResponse;
  }

  //  Update chapter by chapter id.

  async updateOne(
    chapterId: string,
    updateChapterDto: UpdateChapterDto
  ): Promise<ChapterDto> {
    const updatedChapter = await this.chapterModel.findByIdAndUpdate(
      chapterId,
      updateChapterDto,
      { new: true }
    );
    if (isNullOrUndefined(updatedChapter)) {
      throw new NotFoundException(
        `Chapter with chapter id: ${chapterId} not found.`
      );
    }
    const updatedChapterResponse = new ChapterDto();
    updatedChapterResponse.id = updatedChapter._id;
    updatedChapterResponse.title = updatedChapter.title;
    updatedChapterResponse.content = updatedChapter.content;
    return updatedChapterResponse;
  }

  //  Delete chapter by chapter id.

  async deleteOne(chapterId: string): Promise<DeletedChapterResponseDto> {
    // No need to delete chapter from books array
    const deletedChapter = await this.chapterModel.findByIdAndDelete(
      chapterId,
      {
        new: true,
      }
    );
    if (isNullOrUndefined(deletedChapter)) {
      throw new NotFoundException(
        `Chapter with chapterId: ${chapterId} not found.`
      );
    }

    const deletedChapterResponse = new DeletedChapterResponseDto();
    deletedChapterResponse.deletedChapterCount = 1;
    return deletedChapterResponse;
  }
}
