import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BookDto } from "@/book/dto/book-dto";

export class FetchBooksResponseDto {
  @ApiProperty({ type: Boolean, default: false })
  @IsNotEmpty()
  isNewAccount: boolean;

  @ApiProperty({ type: [BookDto], default: [] })
  books: BookDto[];
}
