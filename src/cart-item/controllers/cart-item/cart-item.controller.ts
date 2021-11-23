import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { cartInterface } from 'src/cart-item/models/cart-item.interface';
import { CartItemService } from 'src/cart-item/services/cart-item/cart-item.service';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) { }

  @Get()
  @HttpCode(200)
  getAll(): Promise<cartInterface[]> {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: number): Promise<cartInterface> {
    return this.cartItemService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: any): Promise<cartInterface> {
    return this.cartItemService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: number, @Body() body: any): Promise<cartInterface> {
    return this.cartItemService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<boolean> {
    return this.cartItemService.delete(id);
  }
}