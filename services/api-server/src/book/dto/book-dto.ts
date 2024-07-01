import { ApiProperty } from "@nestjs/swagger";

// BookDto for book list view with chapter count
export class BookDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  handle: string;

  @ApiProperty({ type: Number })
  chapterCount: number;

  @ApiProperty({ type: String })
  state: string;
}
