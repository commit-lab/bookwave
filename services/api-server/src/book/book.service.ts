import { Model } from "mongoose";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { isNullOrUndefined } from "@bookwave/utils";
import { BOOK_MODEL } from "./book.constants";
import { type UpdateBookDto } from "./dto/update-book.dto";
import { type BookDocument } from "@/book/interfaces/book.interface";
import { type CreateBookDto } from "@/book/dto/create-book.dto";
import { BookDto } from "@/book/dto/book-dto";
import { type ChapterDocument } from "@/chapter/interfaces/chapter.interface";
import { CHAPTER_MODEL } from "@/chapter/chapter.constants";
import { BookWithChapterTitlesDto } from "@/book/dto/book-with-chapter-titles.dto";
import { DeletedBookResponseDto } from "@/book/dto/deleted-book-response.dto";

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_MODEL)
    private readonly bookModel: Model<BookDocument>,

    @Inject(CHAPTER_MODEL)
    private readonly chapterModel: Model<ChapterDocument>
  ) {}

  // Find all books by author
  // Required response for book_list view: title, state, numChapters

  async findAll(authorId: string): Promise<BookDto[]> {
    const allBooks = await this.bookModel
      .find({ author: authorId })
      .sort({ state: 1, updatedAt: -1 }) // Sort in order of most recently updated and "Draft" books before "Published"
      .exec();

    const booksResponse = allBooks.map((book) => {
      const bookDto = new BookDto();
      bookDto.id = book._id;
      bookDto.title = book.title;
      bookDto.handle = book.handle;
      bookDto.chapterCount = book.chapters.length;
      bookDto.state = book.state;
      return bookDto;
    });

    return booksResponse;
  }

  //Find one book by {bookHandle}
  // Required response for book_detail view: title, state, chapter titles, chapter numWords

  async findOneWithChapterTitles(
    bookHandle: string
  ): Promise<BookWithChapterTitlesDto> {
    const book = await this.bookModel
      .findOne({ handle: bookHandle })
      .populate("chapters", "title")
      .exec();
    if (isNullOrUndefined(book)) {
      throw new NotFoundException(
        `Book with bookHandle: /${bookHandle} not found.`
      );
    }
    const bookResponse = new BookWithChapterTitlesDto();
    bookResponse.id = book._id;
    bookResponse.title = book.title;
    bookResponse.handle = book.handle;
    bookResponse.state = book.state;
    const chapterTitles = book.chapters.map((chapter) => {
      return chapter.title;
    });
    bookResponse.chapterTitles = chapterTitles;
    return bookResponse;
  }

  // Create a book.
  // Required fields: book title and book handle

  async create(
    createBookDto: CreateBookDto,
    authorId: string
  ): Promise<BookDto> {
    const createdBook = await this.bookModel.create({
      ...createBookDto,
      author: authorId,
    });
    const createdBookResponse = new BookDto();

    createdBookResponse.title = createdBook.title;
    createdBookResponse.handle = createdBook.handle;
    createdBookResponse.chapterCount = createdBook.chapters.length;
    createdBookResponse.state = createdBook.state;
    return createdBookResponse;
  }

  // Update a book.

  async updateOne(
    bookId: string,
    updateBookDto: UpdateBookDto
  ): Promise<BookDto> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      bookId,
      updateBookDto,
      { new: true }
    );

    if (isNullOrUndefined(updatedBook)) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }

    const updatedBookResponse = new BookDto();
    updatedBookResponse.title = updatedBook.title;
    updatedBookResponse.handle = updatedBook.handle;
    updatedBookResponse.chapterCount = updatedBook.chapters.length;
    updatedBookResponse.state = updatedBook.state;
    return updatedBookResponse;
  }

  // Delete a book.

  async deleteOne(bookId: string): Promise<DeletedBookResponseDto> {
    const bookToDelete = await this.bookModel
      .findOne({ _id: bookId })
      .populate("chapters", "_id");

    if (isNullOrUndefined(bookToDelete)) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }

    let chapterCount = 0;
    bookToDelete.chapters.forEach(async (chapterId) => {
      // first delete all chapters of book
      await this.chapterModel.findByIdAndDelete(chapterId);
      chapterCount++;
    });

    await this.bookModel.findOneAndDelete({ _id: bookId }, { new: true });

    const deletedBookResponse = new DeletedBookResponseDto();
    deletedBookResponse.deletedBookCount = 1;
    deletedBookResponse.deletedChapterCount = chapterCount;
    return deletedBookResponse;
  }
}
