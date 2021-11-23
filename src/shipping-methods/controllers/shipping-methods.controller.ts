import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ShippingMethodsService } from '../services/shipping-methods.service';

@Controller('shipping-methods')
export class ShippingMethodsController {

  constructor(
    private shippingMethodsService: ShippingMethodsService
  ) { }

  @Get()
  @HttpCode(200)
  getAll() {
    return this.shippingMethodsService.findAll();
  }

  @Get('count')
  @HttpCode(200)
  getCount() {
    return this.shippingMethodsService.getCount();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(
    @Param('id') id: number
  ) {
    return this.shippingMethodsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Body() body: any,
  ) {
    return this.shippingMethodsService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  update(
    @Body() body: any,
    @Param('id') id: number
  ) {
    return this.shippingMethodsService.update(body, id);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(
    @Param('id') id: number
  ) {
    return this.shippingMethodsService.delete(id);
  }

}