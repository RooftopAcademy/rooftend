import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ShippingMethodsService } from '../services/shipping-methods.service';

@Controller('api/shipping-methods')
export class ShippingMethodsController {

  constructor(
    private shippingMethodsService: ShippingMethodsService
  ) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.getAll();
  }

  @Get('count')
  @HttpCode(200)
  getCount() {
    return this.getCount();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(
    @Param('id') id: number
  ) {
    return this.getOne(id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Body() body: any,
  ) {
    return this.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  update(
    @Body() body: any,
    @Param('id') id: number
  ) {
    return this.update(body, id);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(
    @Param('id') id: number
  ) {
    return this.delete(id);
  }

}