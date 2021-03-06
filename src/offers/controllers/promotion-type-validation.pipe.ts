import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  isDefined,
  isEnum,
} from 'class-validator';

import { PromotionType } from '../entities/promotion-type.enum';

@Injectable()
export class PromotionTypeValidationPipe implements PipeTransform<string, Promise<PromotionType>> {

  transform(promotionType: string): Promise<PromotionType> {
    if (!isDefined(promotionType)) {
      return null;
    }

    if (!isEnum(promotionType, PromotionType)) {
      throw new BadRequestException('Invalid value for promotion_type parameter.');
    }

    return PromotionType[promotionType];
  }
}