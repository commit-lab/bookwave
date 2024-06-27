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
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookService } from "./book.service";
import { type BookDocument } from "./interfaces/book.interface";
import { Author } from "@/author/author.decorator";

@ApiBearerAuth()
@ApiTags("books")
@Controller("/books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Return all Books by an Author passing Author _id from Request.

  @ApiOkResponse({
    description: "All books by Author successfully found.",
    // type: [BookDto],
  })
  @Get()
  async getAll(@Author("_id") authorId: string): Promise<BookDocument[]> {
    try {
      const allBooks = await this.bookService.findAll(authorId);
      return allBooks;
    } catch {
      throw new NotFoundException(`Books for AuthorId: not found`);
    }
  }

  // Return one Book by an Author.

  @ApiOkResponse({
    description: "Book successfully found.",
    // type: [BookDto],
  })
  @Get("/:bookHandle")
  async getOne(@Param("bookHandle") bookHandle: string): Promise<BookDocument> {
    try {
      const book = await this.bookService.findOne(bookHandle);
      return book;
    } catch {
      throw new NotFoundException(`Books for AuthorId: not found`);
    }
  }

  // Create a Book passing Author _id from Request.

  @ApiOkResponse({
    description: "The book has been successfully created.",
  })
  @Post()
  async createOne(
    @Author("_id") authorId: string,
    @Body() newBookInput: CreateBookDto
  ) {
    try {
      await this.bookService.create(newBookInput, authorId);
    } catch {
      throw new NotImplementedException();
    }
  }

  // Update a Book by Book _id.

  @Put("/:bookId")
  async updateOne(
    @Param("bookId") bookId: string,
    @Body() updateBookInput: UpdateBookDto
  ) {
    try {
      const updatedBook = await this.bookService.updateOne(
        bookId,
        updateBookInput
      );
      return updatedBook;
    } catch {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
  }

  // Delete a Book by Book _id.

  @ApiOkResponse({
    description: "The Book has been successfully deleted",
  })
  @ApiNotFoundResponse({
    description: "Book not found",
  })
  @Delete("/:bookId")
  async deleteBook(@Param("bookId") bookId: string) {
    try {
      await this.bookService.deleteOne(bookId);
    } catch {
      throw new NotFoundException(`Book with BookId: ${bookId} not found`);
    }
  }
}
