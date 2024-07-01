import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateChapterDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly content: string;
}
