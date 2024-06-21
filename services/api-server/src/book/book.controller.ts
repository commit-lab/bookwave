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
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookService } from "./book.service";
import { type Book } from "./interfaces/book.interface";
import { BookDto } from "./dto/book-dto";

@ApiTags("books")
@Controller(":authorId/books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Get all books authorerd/owned by Author => /:authorid/books
  @ApiOkResponse({
    type: [BookDto],
  })
  @Get()
  async getAllBooks(@Param("authorId") authorId: string): Promise<Book[]> {
    try {
      const allBooks = await this.bookService.getAllBooks(authorId);
      return allBooks;
    } catch {
      throw new NotFoundException(`Books for AuthorId: ${authorId} not found`);
    }
  }

  // Get single book authored/owned by Author => /:authorId/books/:bookId
  @ApiOkResponse({
    type: [BookDto],
  })
  @Get("/:bookId")
  async getOneBook(@Param("bookId") bookId: string): Promise<Book> {
    try {
      const book = await this.bookService.getOneBook(bookId);
      return book;
    } catch {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
  }

  // Create a new book => /:authorId/books
  @ApiResponse({
    status: 201,
    description: "The book has been successfully created.",
  })
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    try {
      await this.bookService.createBook(createBookDto);
    } catch {
      throw new NotImplementedException();
    }
  }

  // Update an existing book => /:authorId/books/:bookId

  @Put("/:bookId")
  async updateBook(
    @Param("bookId") bookId: string,
    @Body() updateBookDto: UpdateBookDto
  ) {
    try {
      const updatedBook = await this.bookService.updateBook(
        bookId,
        updateBookDto
      );
      return updatedBook;
    } catch {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
  }

  // Delete a book => /:authorId/books/:bookId
  @ApiOkResponse({
    description: "Book successfully deleted",
  })
  @ApiNotFoundResponse({
    description: "Book not found",
  })
  @Delete("/:bookId")
  async deleteBook(@Param("bookId") bookId: string) {
    try {
      await this.bookService.deleteBook(bookId);
    } catch {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
  }
}
