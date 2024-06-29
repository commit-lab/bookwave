import { ApiProperty } from "@nestjs/swagger";

export class BookWithChaptersDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  handle: string;

  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: Array })
  chapters: string[];
}
