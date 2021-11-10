/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentMethod from '../paymentMethod.entity';

@Injectable()
export default class PaymentMethodsService {

    constructor(
        @InjectRepository(PaymentMethod) private readonly repository: Repository<PaymentMethod>
    ) {}

    async all() : Promise<PaymentMethod[]> {
        return await this.repository.find();
    }

    find(id : number) : Promise<PaymentMethod> {
        return this.repository.findOne(id);
    }

    create(@Body() body) : void { 
    }

    async update(id: number, body: PaymentMethod) : Promise<PaymentMethod> {
        const paymentMethod = await this.find(id);
        this.repository.merge(paymentMethod, body);
        return this.repository.save(paymentMethod);
    }

    async delete(id: number) : Promise<void> {
        await this.repository.delete(id);
    }
}
