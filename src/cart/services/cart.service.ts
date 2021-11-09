import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

    constructor(@InjectRepository(Cart) private cartRepo : Repository<Cart>){
    }

    findAll(){
        return this.cartRepo.find();
    }

    findOne(id : number ){
        return this.cartRepo.findOne(id);
    }

    create(body : any){
        const newCart = new Cart();
        newCart.userId = body.userId;
        newCart.ammount = body.ammount;
        newCart.currencyCode = body.currencyCode;
        return this.cartRepo.save(newCart);
    }

    async update(id : number , body : any){
        const cart = await this.cartRepo.findOne(id);
        this.cartRepo.merge(cart, body);
        return this.cartRepo.save(cart);
    }

    async delete(id : number){
        await this.cartRepo.delete(id);
        return true;
    }

}
