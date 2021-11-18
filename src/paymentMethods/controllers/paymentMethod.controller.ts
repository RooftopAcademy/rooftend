/* eslint-disable prettier/prettier */
import { 
  Body, Controller, Delete, 
  Get, HttpCode, Param, 
  Post, Put, Res 
} from '@nestjs/common';
import { PaymentMethodDto } from '../create-payment-method.dto';
import PaymentMethod from '../payment-method.entity';
import PaymentMethodsService from '../services/payment-method.service';

@Controller('payment')
export default class PaymentMethodsController {

    constructor(private readonly service: PaymentMethodsService) {}

    @Get()
        async all(@Res(({ passthrough: true })) response) : Promise<PaymentMethod[]> {
            const payment_methods = await this.service.all(); 

            if (payment_methods) return payment_methods;
            
            return response.status(404).end()
        }

    @Get(':id')
        async find(@Param('id') id : number, @Res(({ passthrough: true })) response) {

            const payment_method : PaymentMethod = await this.service.find(id);

            if (payment_method) return payment_method;

            return response.status(404).end();
        }

    @Post()
    @HttpCode(201)
        create(@Body() body: PaymentMethodDto) {
            return this.service.create(body);
        }

    @Put(':id')
    @HttpCode(204)
        update(@Param('id') id: number, @Body() body: PaymentMethodDto) {
            return this.service.update(id, body);
        }

    @Delete(':id')
    @HttpCode(200)
        delete(@Param('id') id: number) {
            return this.service.delete(id);
        }
}
