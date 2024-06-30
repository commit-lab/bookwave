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
import { BookWithChaptersDto } from "@/book/dto/book-with-chapters.dto";

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_MODEL)
    private readonly bookModel: Model<BookDocument>,

    @Inject(CHAPTER_MODEL)
    private readonly chapterModel: Model<ChapterDocument>
  ) {}

  // Find all books by author.

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

  // Find one book by an author.

  async findOne(bookHandle: string): Promise<BookDto> {
    const book = await this.bookModel.findOne({ handle: bookHandle }).exec();
    if (isNullOrUndefined(book)) {
      throw new NotFoundException(
        `Book with bookHandle: /${bookHandle} not found.`
      );
    }

    const bookResponse = new BookDto();
    bookResponse.id = book._id;
    bookResponse.title = book.title;
    bookResponse.handle = book.handle;
    bookResponse.chapterCount = book.chapters.length;
    bookResponse.state = book.state;
    return bookResponse;
  }

  // Find one book by an author (return populated chapters in response)

  async findOneWithChapters(bookId: string): Promise<BookWithChaptersDto> {
    const book = await this.bookModel
      .findOne({ _id: bookId })
      .populate({ path: "chapters", model: "Chapter" })
      .exec();
    if (isNullOrUndefined(book)) {
      throw new NotFoundException(`Book with bookId: ${bookId} not found.`);
    }

    const bookWithChaptersResponse = new BookWithChaptersDto();
    bookWithChaptersResponse.title = book.title;
    bookWithChaptersResponse.handle = book.handle;
    bookWithChaptersResponse.state = book.state;
    bookWithChaptersResponse.chapters = book.chapters;

    return bookWithChaptersResponse;
  }

  // Create a book.

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

  // Delete a book (need to delete associated chapters)

  async deleteOne(bookId: string): Promise<BookDocument | null> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId, {
      new: true,
    });
    if (isNullOrUndefined(deletedBook)) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }
    return deletedBook;
  }
}
