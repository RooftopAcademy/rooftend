import { OmitType, PartialType } from "@nestjs/swagger";
import { FavoriteDto } from "./favorite.dto";

export class CreateFavoriteDto extends PartialType(
  OmitType(FavoriteDto, ['id', 'user_id', 'updatedAt'] as const),
) {
}
