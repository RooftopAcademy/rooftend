import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CartItemService } from '../services/cart-item.service';
import { CartItem } from '../entities/cart-item.entity';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateCartItemDTO } from '../entities/create-cart-item.dto';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { User } from '../../users/entities/user.entity';
import { Request } from 'express';
import { subject } from '@casl/ability';
import { Permission } from '../../auth/permission.enum';
import { CartService } from '../../cart/services/cart.service';

@ApiTags('Cart Item')
@Controller('carts')
export class CartItemController {
  constructor(
    private readonly cartItemService: CartItemService,
    private readonly cartService: CartService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async failIfCannotAccess(user: User, cartId: number, permission: Permission) {
    const cart = await this.cartService.findOne(cartId);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(permission, subject('Cart', cart))) {
      throw new ForbiddenException();
    }
  }

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the cart items',
    type: [CartItem],
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @Get(':cartId/items')
  @HttpCode(200)
  async getAll(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Res({ passthrough: true }) response,
  ): Promise<CartItem[]> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Read);

    const cartItems: CartItem[] = await this.cartItemService.findAll(cartId);

    return cartItems ? cartItems : response.status(404).end();
  }

  @ApiOperation({ summary: 'Get a single cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Cart Item found with the passed ID',
    type: CartItem,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Not Found Item',
  })
  @Get(':cartId/items/:itemId')
  @HttpCode(200)
  async getOne(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
    @Res({ passthrough: true }) response,
  ): Promise<CartItem> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Read);

    const cartItem: CartItem = await this.cartItemService.findOne(
      cartId,
      itemId,
    );

    return cartItem ? cartItem : response.status(404).end();
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
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @Post(':cartId/items/:itemId')
  @HttpCode(201)
  async create(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
    @Body() body: CreateCartItemDTO,
  ): Promise<CartItem> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Create);

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
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Not Found Item',
  })
  @Patch(':cartId/items/:itemId')
  @HttpCode(204)
  async update(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
    @Body() body: CreateCartItemDTO,
  ): Promise<CartItem> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Update);

    return this.cartItemService.update(cartId, itemId, body);
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
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @Delete(':cartId/items/:itemId')
  @HttpCode(200)
  async delete(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
  ): Promise<void> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Delete);

    return this.cartItemService.delete(cartId, itemId);
  }
}
