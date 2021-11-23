import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { cartItemInterface } from 'src/cart-item/models/cart-item.interface';
import { CartItemService } from 'src/cart-item/services/cart-item.service';
import { cartItem } from '../models/cart-item.entity';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags("Cart Item")
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) { }

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the cart items',
    type: cartItem,
  })
  @Get()
  @HttpCode(200)
  getAll(): Promise<cartItemInterface[]> {
    return this.cartItemService.findAll();
  }

  @ApiOperation({ summary: 'Get a single cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Cart Item found with the passed ID',
    type: cartItem,
  })
  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: number): Promise<cartItemInterface> {
    return this.cartItemService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a cart item' })
  @ApiResponse({
    status: 201,
    description: 'The created cart item',
    type: cartItem,
  })
  @ApiBadRequestResponse({
    description: 'The cart item could not be created',
  })
  @Post()
  @HttpCode(201)
  create(@Body() body: any): Promise<cartItemInterface> {
    return this.cartItemService.create(body);
  }

  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiResponse({
    status: 204,
    description: 'The updated cart item',
    type: cartItem,
  })
  @ApiBadRequestResponse({
    description: 'The cart item could not be updated',
  })
  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: number, @Body() body: any): Promise<cartItemInterface> {
    return this.cartItemService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'If the cart item was removed or not',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'The cart item could not be deleted',
  })
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<boolean> {
    return this.cartItemService.delete(id);
  }
}