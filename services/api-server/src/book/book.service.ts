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

  // Find all Books by an Author.

  async findAll(author: string): Promise<BookDocument[]> {
    const allBooks = await this.bookModel
      .find({ author })
      .sort({ title: 1 })
      .exec();
    return allBooks;
  }

  // Find one Book by an Author.

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

  // Create a Book.

  async create(
    newBookInput: CreateBookDto,
    authorId: string
  ): Promise<BookDocument> {
    const book = await this.bookModel.create({
      ...newBookInput,
      author: authorId,
    });
    return book.save();
  }

  // Update a Book.

  async updateOne(
    bookId: string,
    updateBookInput: UpdateBookDto
  ): Promise<BookDocument> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      bookId,
      updateBookInput,
      { new: true }
    );

    if (!updatedBook) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }
    return updatedBook;
  }

  // Delete a Book.
  // May decide to archive instead.

  async deleteOne(bookId: string): Promise<BookDocument> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId);
    if (!deletedBook) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found.`);
    }
    return deletedBook;
  }
}
