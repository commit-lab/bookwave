import { ApiProperty } from "@nestjs/swagger";

export class BookDetailDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  handle: string;

  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: Array })
  chapters: [];
}
