import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { getRepository, IsNull, Not, Repository } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

    constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {
    }

    findAll() : Promise<Cart[]>{
        return this.cartRepo.find();
    }

    findOne(id: number) : Promise<Cart>{
        return this.cartRepo.findOne(id);
    }

    create(body: any) : Promise<Cart>{
        const newCart = this.cartRepo.create({
            amount: body.amount,
            userId: body.userId,
            currencyCode: body.currencyCode
        });

        return this.cartRepo.save(newCart);
    }

    async update(id: number, body: any) : Promise<Cart>{
        const cart = await this.cartRepo.findOne(id);
        this.cartRepo.merge(cart, body);
        return this.cartRepo.save(cart);
    }

    async delete(id: number) : Promise<void>{
        await this.cartRepo.delete(id);
    }

    async getCartItems(id: number){
        const cartItemsRepo = await getRepository(CartItem);
        return cartItemsRepo.find({
            cartId: id
        });
    }

    async paginate(options: IPaginationOptions,userId: number): Promise<Pagination<Cart>> {
        return paginate<Cart> (
            this.cartRepo,
            options, 
            {
                //relations:['userId'],
                select: ["id", "amount", "currencyCode", "purchasedAt","userId"],
                where:{
                    userId: userId,
                    purchasedAt: Not(IsNull())
                },
                order:{
                    purchasedAt: 'DESC'
                },
            }
        )
    }
}