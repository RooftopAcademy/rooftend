import {
  BadRequestException,
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
import { PromotionType } from '../entities/promotion-type.enum';
import { PromotionTypeValidationPipe } from '../pipes/promotion-type-validation.pipe';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { OfferDTO } from '../dto/offer.dto';

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
        'items': [
            {
                'itemTitle': 'Notebook Xiaomi AMD Ryzen 7',
                'regularPrice': 230000,
                'discountRate': 25,
                'finalPrice': 150000,
                'offerStartTime': '2021-12-01T03:00:00.000Z',
                'offerEndTime': '2021-12-28T03:00:00.000Z',
                'promotionType': 'LIGHTNING_DEAL',
                'soldPercentage': 50,
                'offerTimeLeft': {
                  'days': 17,
                  'hours': 10,
                  'minutes': 26,
                  'seconds': 13,
                  'milliseconds': 645.123,
                },
            },
        ],
        'meta': {
            'totalItems': 1,
            'itemCount': 1,
            'itemsPerPage': 50,
            'totalPages': 1,
            'currentPage': 1,
        },
        'links': {
            'first': '/offers?limit=50',
            'previous': '',
            'next': '',
            'last': '/offers?page=1&limit=50',
        }
      },
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request response with the error description',
    schema: {
      example: {
        'statusCode': 400,
        'message': 'Invalid value for promotion_type parameter.',
        'error': 'Bad Request',
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
    description: 'Order in which the final price of each offer is shown: DESC or ASC',
    required: false,
    example: 'DESC',
  })
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('promotion_type', PromotionTypeValidationPipe) promotionType: PromotionType | null,
    @Query('price_order') order: 'ASC' | 'DESC' | null = null,
  ): Promise<Pagination<OfferDTO, IPaginationMeta>> {
    const ITEMS_LIMIT: number = 50;
    const paginateOptions = {
      page,
      limit: ITEMS_LIMIT,
      route: '/offers',
    };

    if (!(order === 'ASC' || order === 'DESC' || order === null)) throw new BadRequestException('Invalid value for order parameter.');
    
    return this.offersService.paginate(paginateOptions, promotionType, order);
  }
}
