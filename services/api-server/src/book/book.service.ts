import { Model } from "mongoose";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { type Book } from "@/book/interfaces/book.interface";
import { type CreateBookDto } from "@/book/dto/create-book.dto";
import { BOOK_MODEL } from "./book.constants";
import { type UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_MODEL)
    private readonly bookModel: Model<Book>
  ) {}

  // Create new Book service:
  async createBook(CreateBookDto: CreateBookDto): Promise<Book> {
    const newBook = await this.bookModel.create(CreateBookDto);
    return newBook.save();
  }

  // Update existing Book service:
  async updateBook(
    bookId: string,
    UpdateBookDto: UpdateBookDto
  ): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      bookId,
      UpdateBookDto,
      { new: true }
    );
    if (!updatedBook) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
    return updatedBook;
  }

  // Delete existing Book service:
  async deleteBook(bookId: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId);
    if (!deletedBook) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
    return deletedBook;
  }

  // Fetch a single Book service:
  async getOneBook(bookId: string): Promise<Book> {
    const book = await this.bookModel
      .findById(bookId)
      .populate("authorId")
      .exec();
    if (!book) {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
    return book;
  }

  // Fetch all Books authored/owned by the Author service:
  async getAllBooks(authorId: string): Promise<Book[]> {
    const AllBooks = await this.bookModel
      .find({ authorId_id: authorId })
      .populate("authorId")
      .exec();
    return AllBooks;
  }
}
