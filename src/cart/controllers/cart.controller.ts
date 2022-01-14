import {
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Req,
} from '@nestjs/common';
import { Request} from 'express';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';
import { CartService } from '../services/cart.service';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';

@ApiTags('Carts')
@Controller('carts')
export class CartController {

  constructor(
    private cartService: CartService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    ) { }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Gets current available Cart ' })
  @ApiResponse({ status: 200, description: 'Succesfully found Cart' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  async getCart(@Req()req: Request): Promise<Cart> {
    const user: any = req.user;
    const cart = await this.cartService.findCart(user.id);
    if (!cart){ throw new NotFoundException('Valid cart not found')};
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Permission.Read, subject('Cart', cart))){
        throw new ForbiddenException()
    };
    return cart;
  }

  @Get(':id')
  @ApiParam({
    name: "id",
    type: "integer",
    required: true
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Gets one cart and its cart items given an Id' })
  @ApiResponse({ status: 200, description: 'Cart succesfully found with given id' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({ status: 404, description: 'No Cart was found that matches that id' })
  async getCartById(
    @Req()req: Request,
    @Param('id') id: number,
    ): Promise<Cart> {
    const user: any = req.user;
    const cart: Cart = await this.cartService.findOne(id);
    if (!cart) {throw new NotFoundException('Valid cart not found')};
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Permission.Read, subject('Cart', cart))){throw new ForbiddenException()};
    return cart;
  }

  
}


