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
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @ApiOperation({
    summary: 'Get a list of offers',
  })
  @ApiOkResponse({
    description: 'Get a paginated offers list and paginate metadata',
    schema: {
      example: {
        "items": [
            {
                "itemTitle": "Notebook Xiaomi AMD Ryzen 7",
                "regularPrice": 230000,
                "discountRate": 25,
                "finalPrice": 150000,
                "offerStartTime": "2021-12-01T03:00:00.000Z",
                "offerEndTime": "2021-12-28T03:00:00.000Z",
                "soldPercentage": 50,
                "offerTimeLeft": {
                  "days": 17,
                  "hours": 10,
                  "minutes": 26,
                  "seconds": 13,
                  "milliseconds": 645.123
                }
            },
            {
                "itemTitle": "Notebook Xiaomi AMD Ryzen 7",
                "regularPrice": 230000,
                "discountRate": 20,
                "finalPrice": 100000
            }
        ],
        "meta": {
            "totalItems": 2,
            "itemCount": 2,
            "itemsPerPage": 50,
            "totalPages": 1,
            "currentPage": 1
        },
        "links": {
            "first": "/offers?limit=50",
            "previous": "",
            "next": "",
            "last": "/offers?page=1&limit=50"
        }
      },
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request response with the error description',
    schema: {
      example: {
        "statusCode": 400,
        "message": "Invalid value for promotion_type parameter.",
        "error": "Bad Request"
      }
    }
  })
  @ApiQuery({
    name: 'page',
    description: 'Requiered page. Default value: 1',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'promotion_type',
    description: 'Promotion type: DEAL_OF_THE_DAY or LIGHTNING_DEAL',
    required: false,
    example: 'DEAL_OF_THE_DAY',
  })
  @ApiQuery({
    name: 'price_order',
    description: 'Order in which the final price of each offer is shown: "DESC OR ASC"',
    required: false,
    example: 'DESC',
  })
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('promotion_type', PromotionTypeValidationPipe) promotionType?: PromotionType,
    @Query('price_order') order?: "ASC" | "DESC"
  ) {
    const ITEMS_LIMIT: number = 50;
    const paginateOptions = {
      page,
      limit: ITEMS_LIMIT,
      route: '/offers',
    };
    return (promotionType && order)
      ? this.offersService.paginate(paginateOptions, promotionType, order)
      : this.offersService.paginate(paginateOptions);
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
