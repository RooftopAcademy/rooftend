import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

    constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {}

    async findCart(): Promise<Cart> {
        const cart = await this.cartRepo.findOne({select: ["id", "amount", "currencyCode", "user"] ,where: { purchasedAt: null }});
        return cart;
        
    }

    async findOne(id:number): Promise<Cart>{
        const cart: Cart = await this.cartRepo.findOne(id, {relations: ["cartItems"]});
        return cart;
    }

    create(user: User): Promise<Cart> {
        let cart = this.cartRepo.create({user});
        return this.cartRepo.save(cart);
    }

    @OnEvent('user.created')
    handleUserCreatedEvent(user: User) {
        this.create(user);
    }
}
