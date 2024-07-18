import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DummyDto {
  @ApiProperty({ type: String })
  readonly id: string;

  @ApiProperty({ type: String })
  readonly foo: string;

  @ApiProperty({ type: String })
  readonly bar: string;

  @ApiProperty({ type: String })
  readonly content: string;
}

export class CreateDummyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly foo: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly bar: string;
}

export class UpdateDummyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly foo: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly bar: string;

  @ApiProperty({ type: String })
  readonly content: string;
}
