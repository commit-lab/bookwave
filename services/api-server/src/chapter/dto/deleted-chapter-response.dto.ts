import { ApiProperty } from "@nestjs/swagger";

export class DeletedChapterResponseDto {
  @ApiProperty({ type: Number, default: 0 })
  deletedChapterCount: number;
}
