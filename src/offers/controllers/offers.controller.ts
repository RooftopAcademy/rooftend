import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OffersService } from '../services/offers.service';
import { PromotionType } from '../entities/offer.entity';
import { PromotionTypeValidationPipe } from '../pipes/promotion-type-validation.pipe';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { interval } from 'rxjs';

@ApiTags('Offers')
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
  async getSoldOffers(@Param('id') id: number,):Promise<number>{
  const offer = await this.offersService.getOffer(id);
  let percentage = (offer.initialStock -offer.soldStock)*100/offer.initialStock
  return percentage
  }

  @Get(':id/timeLeft')
  @ApiParam({
      name: "id",
      type: "integer",
      required: true
  })
  @ApiOperation({summary: 'Gets left over time of an Offer that matches given id'})
  @ApiResponse({status: 201, description: 'Offer succesfully found'})
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
  @ApiNotFoundResponse({status: 404, description: 'No Offer was found that matches that id'})
  async getOfferTimeLeft(@Param('id') id: number,):Promise<Date>{
    const offer = await this.offersService.getOffer(id);
    let timeLeft = new Date(offer.endAt).getTime() - Date.now();
    console.log(timeLeft);
    return new Date(timeLeft)
  }
}
