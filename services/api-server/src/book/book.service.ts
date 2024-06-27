import { Model } from "mongoose";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { BOOK_MODEL } from "./book.constants";
import { type UpdateBookDto } from "./dto/update-book.dto";
import { type BookDocument } from "@/book/interfaces/book.interface";
import { type CreateBookDto } from "@/book/dto/create-book.dto";

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_MODEL)
    private readonly bookModel: Model<BookDocument>
  ) {}

  // Find all books by author.

  async findAll(author: string): Promise<BookDocument[]> {
    const allBooks = await this.bookModel
      .find({ author })
      .sort({ title: 1 })
      .exec();
    return allBooks;
  }

  // Find one book by an author.

  async findOne(bookHandle: string): Promise<BookDocument> {
    const book = await this.bookModel
      .findOne({ handle: bookHandle })
      .populate("chapters")
      .exec();
    if (!book) {
      throw new NotFoundException(
        `Book with bookHandle: /${bookHandle} not found.`
      );
    }
    return book;
  }

  // Create a book.

  async create(
    newBookData: CreateBookDto,
    authorId: string
  ): Promise<BookDocument> {
    const book = await this.bookModel.create({
      ...newBookData,
      author: authorId,
    });
    return book;
  }

  // Update a book.

  async updateOne(
    bookId: string,
    updateBookData: UpdateBookDto
  ): Promise<BookDocument> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      bookId,
      updateBookData,
      { new: true }
    );

    if (!updatedBook) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }
    return updatedBook;
  }

  // Delete a book.
  // May archive instead.

  async deleteOne(bookId: string): Promise<BookDocument> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId, {
      new: true,
    });
    if (!deletedBook) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }
    return deletedBook;
  }
}
