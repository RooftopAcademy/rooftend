/* eslint-disable prettier/prettier */
import { 
  Body, Controller, Delete, 
  Get, HttpCode, Param, 
  Post, Put, Res 
} from '@nestjs/common';
import PaymentMethod from '../paymentMethod.entity';
import PaymentMethodsService from '../services/paymentMethod.service';

@Controller('payment-methods')
export class PaymentMethodsController {

    constructor(private readonly service: PaymentMethodsService) {}

    @Get()
        all(@Res() response) : Promise<PaymentMethod[]> {
            const payment_methods = this.service.all(); 

            if (payment_methods) return payment_methods;

            return response.status(404).end();
        }

    @Get(':id')
        async find(@Param(':id') id : number, @Res() response) {
            const payment_method : PaymentMethod = await this.service.find(id);

            if (payment_method) return payment_method;

            return response.status(404).end();
        }

    @Post()
    @HttpCode(201)
        create(@Body() paymentMethod: PaymentMethod) {
            return this.service.create(paymentMethod);
        }

    @Put(':id')
    @HttpCode(204)
        update(@Param('id') id: number, @Body() paymentMethod: PaymentMethod) {
            return this.service.update(id, paymentMethod);
        }

    @Delete(':id')
    @HttpCode(200)
        delete(@Param('id') id: number) {
            return this.service.delete(id);
        }
}
