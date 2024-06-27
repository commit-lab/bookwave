import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  @ApiProperty({ type: String })
  readonly title: string;

  @ApiProperty({ type: Number })
  readonly numChapters: number;

  @ApiProperty({ type: String })
  readonly state: string;
}
