import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation, 
  ApiQuery, 
  ApiTags,
} from '@nestjs/swagger';

import { OffersService } from '../services/offers.service';
import { PromotionType } from '../entities/offer.entity';
import { PromotionTypeValidationPipe } from '../pipes/promotion-type-validation.pipe';
import { paginate } from 'nestjs-typeorm-paginate';

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
                "finalPrice": 150000
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
    description: 'Promotion type: DEAL_OF_THE_DAY or LIGHTENING_DEAL',
    required: false,
    example: 'DEAL_OF_THE_DAY',
  })
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('promotion_type', PromotionTypeValidationPipe) promotionType?: PromotionType,
  ) {
    const ITEMS_LIMIT: number = 50;
    const paginateOptions = {
      page,
      limit: ITEMS_LIMIT,
      route: '/offers',
    };
    return (promotionType)
      ? this.offersService.paginate(paginateOptions, promotionType)
      : this.offersService.paginate(paginateOptions);
  }
}
