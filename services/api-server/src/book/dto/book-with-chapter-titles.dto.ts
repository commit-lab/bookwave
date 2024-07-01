import { ApiProperty } from "@nestjs/swagger";
import { type ChapterDocument } from "@/chapter/interfaces/chapter.interface";

export class BookWithChapterTitlesDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  handle: string;

  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: Array })
  chapterTitles: ChapterDocument["title"][];
}
