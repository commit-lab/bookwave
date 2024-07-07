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
import { Author } from "@/author/author.decorator";
import { BookDto } from "@/book/dto/book-dto";
import { BookWithChapterTitlesDto } from "@/book/dto/book-with-chapter-titles.dto";
import { DeletedBookResponseDto } from "@/book/dto/deleted-book-response.dto";
import { BookService } from "./book.service";
import { UpdateBookDto } from "./dto/update-book.dto";
import { CreateBookDto } from "./dto/create-book.dto";

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
  async getAll(@Author("_id") authorId: string): Promise<BookDto[]> {
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
    type: BookWithChapterTitlesDto,
  })
  @Get("/:bookHandle")
  async getOne(
    @Author("_id") authorId: string,
    @Param("bookHandle") bookHandle: string
  ): Promise<BookWithChapterTitlesDto> {
    try {
      this.logger.log(
        `Author ${authorId} retrieving book with book handle: /${bookHandle}.`
      );
      const book = await this.bookService.findOneWithChapterTitles(bookHandle);
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
    @Body() createBookDto: CreateBookDto
  ): Promise<BookDto> {
    try {
      this.logger.verbose(
        `Author with author id: ${authorId} creating a new book. Data: ${JSON.stringify(createBookDto)}.`
      );
      const createdBook = await this.bookService.create(
        createBookDto,
        authorId
      );
      return createdBook;
    } catch {
      this.logger.error(
        `Failed to create book for author with author id: ${authorId}. Data: ${JSON.stringify(createBookDto)}. `
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
    @Body() updateBookDto: UpdateBookDto
  ): Promise<BookDto> {
    try {
      this.logger.log(
        `Author with author id: ${authorId} updating book with book id: ${bookId}.`
      );
      const updatedBook = await this.bookService.updateOne(
        bookId,
        updateBookDto
      );
      return updatedBook;
    } catch {
      this.logger.error(
        `Failed to update book with book id: ${bookId}. Data: ${JSON.stringify(updateBookDto)}. `
      );
      throw new NotFoundException(`Book with book id: ${bookId} not found.`);
    }
  }

  @ApiOkResponse({
    description: "Book successfully deleted.",
    type: DeletedBookResponseDto,
  })
  @Delete("/:bookId")
  async deleteBook(
    @Param("bookId") bookId: string
  ): Promise<DeletedBookResponseDto> {
    try {
      const deletedBookCount = await this.bookService.deleteOne(bookId);
      return deletedBookCount;
    } catch {
      this.logger.error(`Failed to delete book with book id: ${bookId}. `);
      throw new NotFoundException(`Book with book id: ${bookId} not found.`);
    }
  }
}
