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
import { Public } from '../../authentication/decorators/public.decorator';

import { ShippingMethod } from '../entities/shipping-method.entity';
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
    status: 200,
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
      ],
    },
  })
  @Public()
  @Get()
  @HttpCode(200)
  getAll(): Promise<ShippingMethod[]> {
    return this.shippingMethodsService.findAll();
  }
}
