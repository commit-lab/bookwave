import { Model } from "mongoose";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { isNullOrUndefined } from "@bookwave/utils";
import { BOOK_MODEL } from "./book.constants";
import { type UpdateBookDto } from "./dto/update-book.dto";
import { type BookDocument } from "@/book/interfaces/book.interface";
import { type CreateBookDto } from "@/book/dto/create-book.dto";
import { BookDto } from "@/book/dto/book-dto";

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_MODEL)
    private readonly bookModel: Model<BookDocument>
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
  // Return chapter titles only in response.

  async findOne(bookHandle: string): Promise<BookDto> {
    const book = await this.bookModel
      .findOne({ handle: bookHandle })
      // .populate({ path: "chapters", select: "title" })
      .exec();
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

  // Delete a book.
  // May archive instead.

  async deleteOne(bookId: string): Promise<BookDocument> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId, {
      new: true,
    });
    if (isNullOrUndefined(deletedBook)) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }
    return deletedBook;
  }
}
