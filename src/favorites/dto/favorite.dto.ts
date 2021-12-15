import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDateString } from "class-validator";

export class FavoriteDto {
  @ApiProperty({
    type: Number,
    description: 'The ID of the Favorite record.',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: Number,
    description: 'The ID of the User record.',
    example: 2,
  })
  @IsInt()
  user_id: number;

  @ApiProperty({
    type: Number,
    description: 'The ID of the Item record.',
    example: 3,
  })
  @IsInt()
  item_id: number;

  @ApiProperty({
    type: Date,
    description: 'The date the record was last updated',
    example: '2021-11-15 17:32:19.537+00',
  })
  @IsDateString()
  updatedAt: Date;
}

