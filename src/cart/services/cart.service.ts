import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

    constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {
    }

    findAll(): Promise<Cart[]> {
        return this.cartRepo.find({
            select: ["id", "amount", "currencyCode"],
            where: { purchasedAt: null }
        });
    }

    findOne(id: number): Promise<Cart> {
        return this.cartRepo.findOne(id);
    }

    create(user: User, body: Cart): Promise<Cart> {
        let cart = this.cartRepo.create(body);
        cart.user = user;
        return this.cartRepo.save(cart);
    }

}