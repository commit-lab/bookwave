import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  @ApiProperty({ type: String })
  readonly title: string;

  @ApiProperty({ type: String })
  readonly handle: string;

  @ApiProperty({ type: String })
  readonly authorId: string;

  @ApiProperty({ type: String })
  readonly state: string;

  @ApiProperty({ type: Array })
  readonly chapters: string[];
}
