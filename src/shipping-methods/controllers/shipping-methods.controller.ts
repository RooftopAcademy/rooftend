<<<<<<< HEAD
import {
  Controller,
  Get,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ShippingMethodDTO } from '../dto/shipping-method.dto';
=======
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
>>>>>>> 21ee98ae4e4ffd8eacca9ea8c7b4217440ce0be0
import { ShippingMethodsService } from '../services/shipping-methods.service';

@ApiTags('Shipping Methods')
@Controller('shipping-methods')
export class ShippingMethodsController {
  constructor(private shippingMethodsService: ShippingMethodsService) {}

  @ApiOperation({
    summary: 'Get all shipping methods',
  })
  @ApiOkResponse({
    description: 'Get a list of shipping methods',
      schema: {
        example: [
          {
            id: 12,
            name: 'Correo Argentino a domicilio',
            logoURL: 'https://images.net/logos/84646',
          },
          {
            id: 13,
            name: 'OCA Retiro en sucursal',
            logoURL: 'https://images.net/logos/87546',
          },
        ]
      }
  })
  @Get()
  @HttpCode(200)
  getAll(): Promise<ShippingMethodDTO[]> {
    return this.shippingMethodsService.findAll();
  }
<<<<<<< HEAD
=======

  @Get('count')
  @HttpCode(200)
  getCount() {
    return this.shippingMethodsService.getCount();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: number) {
    return this.shippingMethodsService.findOne(id);
  }
>>>>>>> 21ee98ae4e4ffd8eacca9ea8c7b4217440ce0be0
}
