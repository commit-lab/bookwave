import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
  @ApiProperty({ type: String, example: "The Chronicles of Narnia" })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String, example: "Chronicles_Narnia" })
  @IsString()
  @IsNotEmpty()
  readonly handle: string;

  @ApiProperty({ type: String, example: "66747b39b0a717aad42268f1" })
  @IsString()
  @IsNotEmpty()
  readonly authorId: string;

  @ApiProperty({ type: String, example: "Draft|Published" })
  @IsString()
  @IsNotEmpty()
  readonly state: string;
}
