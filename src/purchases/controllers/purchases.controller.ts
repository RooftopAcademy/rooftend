import { Controller, ForbiddenException, Get, HttpCode, NotFoundException, Param, Req, UnauthorizedException } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';
import { PurchaseDetails } from '../entities/purchase-details.entity';
import { PurchasesService } from '../services/purchases.service';
import { Request } from 'express';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';

@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @ApiOperation({ summary: 'Get all purchases' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the purchases',
    type: Cart,
  })
  @Get()
  @HttpCode(200)
  findAll(@Req() req: Request) {
    const user: User = <User>req.user;

    return this.purchasesService.findAll(user);
  }

  @ApiOperation({ summary: 'Get a purchase by id' })
  @ApiResponse({
    status: 200,
    description: 'The found purchase with that id',
    type: PurchaseDetails,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Purchases Not Found',
    schema: {
      example: new NotFoundException('Purchases not found').getResponse(),
    },
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id') id: number | string,
    @Req() req: Request,  
  ) {
    const user: User = <User>req.user;

    const purchases = await this.purchasesService.findOneById(id);

    if(!history) {
      throw new NotFoundException('Purchases not found.');
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    if(ability.cannot(Permission.Read, subject('Purchases', purchases))) {
      throw new ForbiddenException();
    }

    return this.purchasesService.findOneById(id);
  }
}
