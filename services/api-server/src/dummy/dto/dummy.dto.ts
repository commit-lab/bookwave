import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DummyDto {
  @ApiProperty({ type: String })
  readonly foo: string;

  @ApiProperty({ type: String })
  readonly bar: string;
}

export class CreateDummyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly foo: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly bar: string;
}
