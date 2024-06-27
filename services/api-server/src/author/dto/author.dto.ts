import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthorDto {
  @ApiProperty({ type: String })
  readonly firstName: string;

  @ApiProperty({ type: String })
  readonly lastName: string;

  @ApiProperty({ type: String })
  readonly handle: string;
}

export class CreateAuthorDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  handle: string;
}

export class FetchAuthorResponseDto {
  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;
}

export class DeleteAuthorResponseDto {
  @ApiProperty({ type: Number, default: 0 })
  deletedCount: number;
}
