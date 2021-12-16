import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';
import { PurchaseDetails } from '../entities/purchase-details.entity';
import { PurchasesService } from '../services/purchases.service';

@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @ApiOperation({ summary: 'Get all purchases' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the purchases',
    type: Cart,
  })
  @Get()
  @HttpCode(200)
  findAll() {
    const user = new User();
    user.id = 1;

    return this.purchasesService.findAll(user.id);
  }

  @ApiOperation({ summary: 'Get a purchase by id' })
  @ApiResponse({
    status: 200,
    description: 'The found purchase with that id',
    type: PurchaseDetails,
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
  })
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number | string) {
    const user = new User();
    user.id = 1;

    return this.purchasesService.findOneById(id, user.id);
  }
}
