import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OffersService } from '../services/offers.service';
import { PromotionTypeDto } from '../dto/promotion-type.dto';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Offers')
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

  @Get(':id')
    @ApiParam({
        name: "id",
        type: "integer",
        required: true
    })
    @ApiOperation({summary: 'Gets percentage of items sold from and offer that matches given id'})
    @ApiResponse({status: 201, description: 'Offer succesfully found'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    @ApiNotFoundResponse({status: 404, description: 'No Offer was found that matches that id'})
  async getSoldOffers(@Param('id') id: number,):Promise<string>{
    const soldOffersPercentage = await this.offersService.getOffer(id);
    let percentage = (soldOffersPercentage.initialStock -soldOffersPercentage.soldStock)*100/soldOffersPercentage.initialStock
    return percentage + '%'
  }
}
