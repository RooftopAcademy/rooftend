import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OffersService } from '../services/offers.service';
import { PromotionTypeDto } from '../dto/promotion-type.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('promotion_type') promotionType: PromotionTypeDto,
  ) {
    const ITEMS_LIMIT: number = 50;
    return this.offersService.paginate({
      page,
      limit: ITEMS_LIMIT,
      route: '/offers',
    }, promotionType)
  }
}
