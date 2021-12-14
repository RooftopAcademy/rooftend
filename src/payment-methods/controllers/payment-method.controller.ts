import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'; /* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import PaymentMethod from '../payment-method.entity';
import PaymentMethodsService from '../services/payment-method.service';
import PaymentMethodDto from '../dto/create-payment-method.dto';

@ApiTags('Payment Methods')
@Controller('payment-methods')
export default class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  @Get()
  @ApiOperation({
    summary: "Returns all the payment methods available"
  })
  @ApiResponse({
    status: 200,
    description: 'All the payment methods found',
    type: PaymentMethodDto,
    isArray: true,
  })
  async all(): Promise<PaymentMethod[]> {
    const payment_methods = await this.service.all();

    if (!payment_methods) {
      throw new NotFoundException('No payment methods found');
    }

    return payment_methods;
  }

  @Get(':id')
  @ApiOperation({
    summary: "Returns the payment method matching the id parameter"
  })
  @ApiOkResponse({
    status: 200,
    description: 'The payment method found',
    type: PaymentMethodDto,
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
