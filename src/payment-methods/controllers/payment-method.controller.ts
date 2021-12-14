import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import PaymentMethod from '../models/payment-method.entity';
import PaymentMethodsService from '../services/payment-method.service';

@ApiTags('Payment Methods')
@Controller('payment-methods')
export default class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({
    summary: "Returns all the payment methods available"
  })
  @ApiOkResponse({
    status: 200,
    description: 'All the payment methods found',
    schema: {
      example: [
        {
          "name": "CASH",
          "type": "Cash"
        },
        {
          "name": "DEBIT_CARD",
          "type": "Debit card"
        },
      ]
    },
  })
  async all(): Promise<PaymentMethod[]> {
    const payment_methods = await this.service.all();

    return payment_methods;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({
    summary: "Returns the payment method matching the id parameter"
  })
  @ApiOkResponse({
    status: 200,
    description: 'The payment method found',
    schema: {
      example: 
        {
          "name": "CASH",
          "type": "Cash"
        }
    }
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiParam({
    name: 'id',
    format: 'number'
  })
  async find(
    @Param('id') id: number,
  ): Promise<PaymentMethod> {
    const payment_method: PaymentMethod = await this.service.find(id);

    if (!payment_method) {
      throw new NotFoundException('Payment method not found');
    }

    return payment_method;
  }

  @Post('*')
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @HttpCode(403)
  create(@Res() res : Response): void 
    { return res.status(403).end('Forbidden'); }

  @Patch('*')
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @HttpCode(403)
  update(@Res() res: Response)
    { return res.status(403).end('Forbidden'); }

  @Delete('*')
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @HttpCode(403)
  delete(@Res() res: Response) : void 
    { return res.status(403).end('Forbidden'); }
}
