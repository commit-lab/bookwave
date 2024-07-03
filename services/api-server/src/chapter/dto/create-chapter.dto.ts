import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateChapterDto {
  @ApiProperty({ type: String, example: "Lucy Looks into a Wardrobe" })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
