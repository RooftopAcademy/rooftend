import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OffersService } from '../services/offers.service';
import { PromotionType } from '../entities/offer.entity';
import { PromotionTypeValidationPipe } from '../pipes/promotion-type-validation.pipe';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('promotion_type', PromotionTypeValidationPipe) promotionType?: PromotionType,
  ) {
    const ITEMS_LIMIT: number = 50;
    return this.offersService.paginate({
      page,
      limit: ITEMS_LIMIT,
      route: '/offers',
    }, promotionType)
  }
}
