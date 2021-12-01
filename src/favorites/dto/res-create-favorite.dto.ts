import { OmitType, PartialType } from "@nestjs/swagger";
import { FavoriteDto } from "./favorite.dto";

export class ResCreateFavoriteDto extends PartialType(
  OmitType(FavoriteDto, ['user_id'] as const),
) {
}
