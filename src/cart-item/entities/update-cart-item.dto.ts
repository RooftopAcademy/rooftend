import { PartialType, PickType } from '@nestjs/swagger';
import { CreateCartItemDTO } from './create-cart-item.dto';

export class UpdateCartItemDTO extends PartialType(
  PickType(CreateCartItemDTO, ['quantity'] as const),
) {}
