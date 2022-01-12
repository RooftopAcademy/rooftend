import {
  Body,
  Controller,
  Get,
  HttpCode,
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

@ApiTags('Carts')
@Controller('carts')
export class CartController {

  constructor(private cartService: CartService) { }

  @Get()
  @UseGuards(PoliciesGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Gets current available Cart ' })
  @ApiResponse({ status: 200, description: 'Succesfully found Cart' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  getCart(): Promise<Cart> {
    const user = new User();
    user.id = 1;
    return this.cartService.findCart(user);
  }

  @Get(':id')
  @ApiParam({
    name: "id",
    type: "integer",
    required: true
  })
  @UseGuards(PoliciesGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Gets one cart and its cart items given an Id' })
  @ApiResponse({ status: 200, description: 'Cart succesfully found with given id' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiNotFoundResponse({ status: 404, description: 'No Cart was found that matches that id' })
  getCartById(
    @Param('id') id: number,
    ): Promise<Cart> {
    const user = new User();
    user.id = 1;
    return this.cartService.findCartById(user, id);
  }

  
}


