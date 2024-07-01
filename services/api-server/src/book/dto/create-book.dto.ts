import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
  @ApiProperty({ type: String, example: "The Chronicles of Narnia" })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String, example: "chroniclesofnarnia" })
  @IsString()
  @IsNotEmpty()
  readonly handle: string;
}
