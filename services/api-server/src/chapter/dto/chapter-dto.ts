import { ApiProperty } from "@nestjs/swagger";

export class ChapterDto {
  @ApiProperty({ type: String })
  readonly title: string;

  @ApiProperty({ type: String })
  readonly content: string;
}
