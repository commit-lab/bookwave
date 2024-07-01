import { ApiProperty } from "@nestjs/swagger";

export class ChapterDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  content: string;
}
