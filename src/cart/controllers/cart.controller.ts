import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from '../../auth/guards/policies.guard';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';
import { CartService } from '../services/cart.service';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { CartItemService } from '../../cart-item/services/cart-item.service';
import { Public } from '../../authentication/decorators/public.decorator';
import { plainToClass } from 'class-transformer';

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
    const reqUser: any = req.user;
    const user: User = plainToClass(User, reqUser.result);
    console.log(user);
    const cart = await this.cartService.findCart();
    if (!cart){ throw new NotFoundException('Valid cart not found')};
    const ability = this.caslAbilityFactory.createForUser(user);
    console.log(ability.can(Permission.Read, subject('Cart', cart)));
    console.log(ability.relevantRuleFor(Permission.Read, subject('Cart', cart)));
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
    const reqUser: any = req.user;
    const user: User = plainToClass(User, reqUser.result);
    console.log(user);
    const cart: Cart = await this.cartService.findOne(id);
    if (!cart) {throw new NotFoundException('Valid cart not found')};
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Permission.Read, subject('Cart', cart))){throw new ForbiddenException()};
    return cart;
  }

  
}


