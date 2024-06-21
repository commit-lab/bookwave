import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly handle: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly state: string;
}
