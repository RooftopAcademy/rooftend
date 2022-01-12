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
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all the payment methods',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  async getAll(): Promise<PaymentMethod[]> {
    const payment_methods = await this.service.getAll();

    return payment_methods;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get the payment method by id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiParam({
    name: 'id',
    format: 'number',
  })
  async findOne(@Param('id') id: number){
    const payment_method: PaymentMethod = await this.service.findOne(id);

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
  create(@Res() res: Response): void {
    return res.status(403).end('Forbidden');
  }

  @Patch('*')
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @HttpCode(403)
  update(@Res() res: Response) {
    return res.status(403).end('Forbidden');
  }

  @Delete('*')
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @HttpCode(403)
  delete(@Res() res: Response): void {
    return res.status(403).end('Forbidden');
  }
}
