import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Request } from 'express';
import { subject } from '@casl/ability';
import { Permission } from '../../auth/enums/permission.enum';

import { CartItemService } from '../services/cart-item.service';
import { CartService } from '../../cart/services/cart.service';

import { CreateCartItemDTO } from '../entities/create-cart-item.dto';

import { CartItem } from '../entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';
import { UpdateCartItemDTO } from '../entities/update-cart-item.dto';
import STATUS from '../../statusCodes/statusCodes';
import Status from '../../statusCodes/status.interface';

@ApiTags('Cart Item')
@ApiBearerAuth()
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
  @ApiUnauthorizedResponse({
    description: 'User not logged in',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to see this cart',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Cart not found',
    schema: {
      example: new NotFoundException('Cart not found').getResponse(),
    },
  })
  @Get(':cartId/items')
  @HttpCode(200)
  async getAll(
    @Req() req: Request,
    @Param('cartId') cartId: number,
  ): Promise<CartItem[]> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Read);

    const cartItems: CartItem[] = await this.cartItemService.findAllFromCart(
      cartId,
    );

    return cartItems;
  }

  @ApiOperation({ summary: 'Get a single cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'A Cart Item found with the passed ID',
    type: CartItem,
  })
  @ApiUnauthorizedResponse({
    description: 'User not logged in',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to see this cart',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Cart or item not found',
    schema: {
      example: new NotFoundException('Cart not found').getResponse(),
    },
  })
  @Get(':cartId/items/:itemId')
  @HttpCode(200)
  async getOne(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
  ): Promise<CartItem> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Read);

    return this.cartItemService.findOne(cartId, itemId);
  }

  @ApiOperation({ summary: 'Create a cart item' })
  @ApiResponse({
    status: 201,
    description: 'The created cart item',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'quantity must be a number',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User not logged in',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to add items to this cart',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Cart or item not found',
    schema: {
      example: new NotFoundException('Cart not found').getResponse(),
    },
  })
  @Post(':cartId/items')
  @HttpCode(201)
  async create(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Body() body: CreateCartItemDTO,
  ): Promise<CartItem> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Create);

    try {
      const cartItem = await this.cartItemService.findOne(cartId, body.itemId);

      return this.update(req, cartId, body.itemId, {
        quantity: cartItem.quantity + body.quantity,
      });
    } catch {
      return this.cartItemService.create(cartId, body);
    }
  }

  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated cart item',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'quantity must be a number',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User not logged in',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to edit items in this cart',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Cart or item not found',
    schema: {
      example: new NotFoundException('Cart not found').getResponse(),
    },
  })
  @Patch(':cartId/items/:itemId')
  @HttpCode(200)
  async update(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
    @Body() body: UpdateCartItemDTO,
  ): Promise<CartItem> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Update);

    return this.cartItemService.update(cartId, itemId, body);
  }

  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Item deleted successfully',
    schema: {
      example: STATUS.DELETED,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User not logged in',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to delete items from this cart',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Cart or item not found',
    schema: {
      example: new NotFoundException('Cart not found').getResponse(),
    },
  })
  @Delete(':cartId/items/:itemId')
  @HttpCode(200)
  async delete(
    @Req() req: Request,
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
  ): Promise<Status> {
    await this.failIfCannotAccess(<User>req.user, cartId, Permission.Delete);

    return this.cartItemService.delete(cartId, itemId);
  }
}
