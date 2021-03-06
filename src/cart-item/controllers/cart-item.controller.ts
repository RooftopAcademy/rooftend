import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CartItemService } from '../services/cart-item.service';
import { CartItem } from '../entities/cart-item.entity';

class DTO {
  quantity: number;
  subtotal: number;
}

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateCartItemDTO } from '../entities/create-cart-item.dto';

@ApiTags('Cart Item')
@Controller('carts')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {
  }

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the cart items',
    type: [CartItem],
  })
  @Get(':cartId/items')
  @HttpCode(200)
  async getAll(
    @Param('cartId') cartId: number,
    @Res({ passthrough: true }) response,
  ): Promise<CartItem[]> {
    const cartItems: CartItem[] = await this.cartItemService.findAllFromCart(cartId);

    return cartItems ? cartItems : response.status(404).end();
  }

  @ApiOperation({ summary: 'Get a single cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Cart Item found with the passed ID',
    type: CartItem,
  })
  @Get(':cartId/items/:itemId')
  @HttpCode(200)
  async getOne(
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
  ): Promise<CartItem> {
    return await this.cartItemService.findOne(cartId, itemId);
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
  @Post(':cartId/items/:itemId')
  @HttpCode(201)
  create(
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
    @Body() body: CreateCartItemDTO,
  ): Promise<CartItem> {
    return this.cartItemService.create(cartId, itemId, body);
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
  @Patch(':cartId/items/:itemId')
  @HttpCode(204)
  update(
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
    @Body() body: CreateCartItemDTO,
  ): Promise<CartItem> {
    return this.cartItemService.create(cartId, itemId, body);
  }

  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'If the cart item was removed or not',
    type: null,
  })
  @ApiBadRequestResponse({
    description: 'The cart item could not be deleted',
  })
  @Delete(':cartId/items/:itemId')
  @HttpCode(200)
  delete(
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
  ) {
    return this.cartItemService.delete(cartId, itemId);
  }
}
