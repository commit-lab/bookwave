import { ApiProperty } from "@nestjs/swagger";

export class DeletedBookResponseDto {
  @ApiProperty({ type: Number, default: 0 })
  deletedBookCount: number;

  @ApiProperty({ type: Number, default: 0 })
  deletedChapterCount: number;
}
