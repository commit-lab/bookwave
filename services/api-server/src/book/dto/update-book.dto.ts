import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly handle: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly state: string;
}
