import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  @ApiProperty({ type: String })
  readonly title: string;

  @ApiProperty({ type: String })
  readonly handle: string;

  @ApiProperty({ type: String })
  readonly state: string;

  // need to update or delete this
  @ApiProperty({ type: [String] })
  readonly chapters: string[];
}
