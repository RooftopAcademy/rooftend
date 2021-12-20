import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

    constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {
    }

    findAll() : Promise<Cart[]>{
        return this.cartRepo.find({
            select: ["id", "amount", "currencyCode"] ,
            where:{ purchasedAt: null}});
    }

}