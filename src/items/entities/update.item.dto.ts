import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create.item.dto';

export class UpdateItemDto extends PartialType(
  OmitType(CreateItemDto, ['categoryId', 'brandId'] as const),
) {}
