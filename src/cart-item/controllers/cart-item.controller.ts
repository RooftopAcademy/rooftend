import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CartItemService } from '../services/cart-item.service';
import { CartItem } from '../entities/cart-item.entity';

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
    type: [CartItem],
  })
  @Get()
  @HttpCode(200)
  getAll(): Promise<CartItem[]> {
    return this.cartItemService.findAll();
  }

  @ApiOperation({ summary: 'Get a single cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Cart Item found with the passed ID',
    type: CartItem,
  })
  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: number): Promise<CartItem> {
    return this.cartItemService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a cart item' })
  @ApiResponse({
    status: 201,
    description: 'The created cart item',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'The cart item could not be created',
  })
  @Post()
  @HttpCode(201)
  create(@Body() body: any): Promise<CartItem> {
    return this.cartItemService.create(body);
  }

  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiResponse({
    status: 204,
    description: 'The updated cart item',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'The cart item could not be updated',
  })
  @Patch(':id')
  @HttpCode(204)
  update(@Param('id') id: number, @Body() body: any): Promise<CartItem> {
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