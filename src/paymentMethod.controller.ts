/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import PaymentMethod from './paymentMethod.entity';
import { PaymentMethodsService } from './paymentMethod.service';

@Controller('payment-methods')
export class PaymentMethodsController {

    constructor(private readonly paymentMethodService: PaymentMethodsService) {}

    @Get('all')
        getAll(): PaymentMethod[] {
            return this.paymentMethodService.getAll();
    }

    @Get(':id')
      getById(@Param(':id') id : number) {
        return this.paymentMethodService.getById(id);
      }

    @Post()
    @HttpCode(201)
      create(@Body() paymentMethod: PaymentMethod) {
        return this.paymentMethodService.create(paymentMethod);
      }

    @Put(':id')
    @HttpCode(204)
      update(@Param('id') id: number, @Body() paymentMethod: PaymentMethod) {
        return this.paymentMethodService.update(id, paymentMethod);
      }

    @Delete(':id')
    @HttpCode(200)
      delete(@Param('id') id: number) {
        return this.paymentMethodService.delete(id);
      }
}
