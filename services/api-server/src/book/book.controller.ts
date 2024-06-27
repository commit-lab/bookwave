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
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookService } from "./book.service";
import { type BookDocument } from "./interfaces/book.interface";
import { Author } from "@/author/author.decorator";
import { BookDto } from "@/book/dto/book-dto";

@ApiBearerAuth()
@ApiTags("books")
@Controller("/books")
export class BookController {
  private logger = new Logger("BookController");
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse({
    description: "All books by author successfully found.",
    type: [BookDto],
  })
  @Get()
  async getAll(@Author("_id") authorId: string): Promise<BookDocument[]> {
    try {
      this.logger.log(
        `Author with author id: ${authorId} retrieving all books.`
      );
      const allBooks = await this.bookService.findAll(authorId);
      return allBooks;
    } catch {
      this.logger.error(
        `Failed to get books for author with author id: ${authorId}.`
      );
      throw new NotFoundException(
        `No books found for author with author id: ${authorId}.`
      );
    }
  }

  @ApiOkResponse({
    description: "Book successfully found.",
    type: BookDto,
  })
  @Get("/:bookHandle")
  async getOne(
    @Author("_id") authorId: string,
    @Param("bookHandle") bookHandle: string
  ): Promise<BookDocument> {
    try {
      this.logger.log(
        `Author ${authorId} retrieving book with book handle: /${bookHandle}.`
      );
      const book = await this.bookService.findOne(bookHandle);
      return book;
    } catch {
      this.logger.error(`Failed to get book with book handle: /${bookHandle}.`);
      throw new NotFoundException(
        `Book with book handle: /${bookHandle} not found.`
      );
    }
  }

  @ApiOkResponse({
    description: "Book successfully created.",
    type: BookDto,
  })
  @Post()
  async createOne(
    @Author("_id") authorId: string,
    @Body() newBookData: CreateBookDto
  ): Promise<BookDocument> {
    try {
      this.logger.verbose(
        `Author with author id: ${authorId} creating a new book. Data: ${JSON.stringify(newBookData)}.`
      );
      const createdBook = await this.bookService.create(newBookData, authorId);
      return createdBook;
    } catch {
      this.logger.error(
        `Failed to create book for author with author id: ${authorId}. Data: ${JSON.stringify(newBookData)}. `
      );
      throw new NotImplementedException("Failed to create book.");
    }
  }

  @ApiOkResponse({
    description: "Book successfully updated.",
    type: BookDto,
  })
  @Put("/:bookId")
  async updateOne(
    @Author("_id") authorId: string,
    @Param("bookId") bookId: string,
    @Body() updateBookData: UpdateBookDto
  ): Promise<BookDocument> {
    try {
      this.logger.log(
        `Author with author id: ${authorId} updating book with book id: ${bookId}.`
      );
      const updatedBook = await this.bookService.updateOne(
        bookId,
        updateBookData
      );
      return updatedBook;
    } catch {
      this.logger.error(
        `Failed to update book with book id: ${bookId}. Data: ${JSON.stringify(updateBookData)}. `
      );
      throw new NotFoundException(`Book with book id: ${bookId} not found.`);
    }
  }

  @ApiOkResponse({
    description: "Book successfully deleted.",
    type: BookDto,
  })
  @Delete("/:bookId")
  async deleteBook(@Param("bookId") bookId: string): Promise<BookDocument> {
    try {
      const deletedBook = await this.bookService.deleteOne(bookId);
      return deletedBook;
    } catch {
      this.logger.error(`Failed to delete book with book id: ${bookId}. `);
      throw new NotFoundException(`Book with book id: ${bookId} not found.`);
    }
  }
}
