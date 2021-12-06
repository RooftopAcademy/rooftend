import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class AccountStatus {
  @ApiProperty({
    description: 'The status id',
    type: Number,
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Status name',
    type: String,
    example: 'BLOCKED',
    maxLength: 10,
  })
  @IsString()
  name: string;
}
