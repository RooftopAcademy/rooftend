import {
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
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

  @Get(':id')
  @HttpCode(200)
  getOne(
    @Param('id') id: number
  ) {
    return this.shippingMethodsService.findOne(id);
  }
}
