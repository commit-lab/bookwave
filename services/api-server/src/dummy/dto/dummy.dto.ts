import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DummyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly foo: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
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
