import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'; /* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PaymentMethodDto } from '../dto/create-payment-method.dto';
import PaymentMethod from '../payment-method.entity';
import PaymentMethodsService from '../services/payment-method.service';

@ApiTags('Payment Methods')
@Controller('payment')
export default class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All the payment methods found',
    type: PaymentMethod,
  })
  async all(@Res({ passthrough: true }) response): Promise<PaymentMethod[]> {
    const payment_methods = await this.service.all();

    if (payment_methods) return payment_methods;

    return response.status(404).end();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The payment methods found',
    type: PaymentMethod,
  })
  async find(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<PaymentMethod> {
    const payment_method: PaymentMethod = await this.service.find(id);

    if (payment_method) return payment_method;

    return response.status(404).end();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The payment method that was just created',
    type: PaymentMethod,
  })
  @HttpCode(201)
  create(@Body() body: PaymentMethodDto): Promise<PaymentMethod> {
    return this.service.create(body);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'The payment method that was just updated',
    type: PaymentMethod,
  })
  @HttpCode(204)
  update(@Param('id') id: number, @Body() body: PaymentMethodDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
}
