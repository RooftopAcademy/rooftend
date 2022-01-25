import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Item } from "../../items/entities/items.entity";

export class CreateFavoriteDto {
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: 'represents the unique identifier of the item',
  })
  item_id: Number
}
