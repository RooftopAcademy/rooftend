import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDateString } from "class-validator";
import { Item } from "../../items/entities/items.entity";


export class HistoryDto {
  @ApiProperty({
      example: 1,
      description: 'The id of the visit' 
    })
  @IsInt()
  id: number;

  @ApiProperty({
      example: 1,
      description: 'The id of the user that make the visit' })
  @IsInt()
  user_id: number;

  @ApiProperty({
      example:1,
      description:'The id of the item that the user visited',
  })
  @IsInt()
  item_id: Item;

  @ApiProperty({
    default: 'now()',
    type: Date,
    description: 'The date-time that was created',
  })
  @IsDateString()
  created_at: Date;
}
