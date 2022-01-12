import { defineAbility, ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { getRepository, Repository } from 'typeorm';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/permission.enum';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { CartItemService } from '../../cart-item/services/cart-item.service';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart) private cartRepo: Repository<Cart>,
        private readonly caslAbilityFactory: CaslAbilityFactory,
        private cartItemService: CartItemService) {}

    async findAll(): Promise<Cart[]> {
        const cartVar = await this.cartRepo.find({//select: ["id", "amount", "currencyCode"],
            where: { purchasedAt: null }});
        console.log(cartVar[0].cartItems);
        return this.cartRepo.find({
            //select: ["id", "amount", "currencyCode"],
            where: { purchasedAt: null }
        });
    }
    // buscar cart con findAll -> buscar todos los cart-items correspondientes usando el servicio de cart-items -> probar si la relacion te agregar los cart-items 
    async findOne(user: User, id: number): Promise<Cart> {
        const cart: Cart = await this.cartRepo.findOne(id);
        cart.cartItems = await this.cartItemService.findAll(id);
        const ability = this.caslAbilityFactory.createForUser(user);
        cart.user.id = +cart.user.id;
        console.log(ability.can(Permission.Read, subject('Cart',cart) ));
        console.log(ability.relevantRuleFor(Permission.Read, Cart ));
        return cart;
    }

    create(user: User): Promise<Cart> {
        let cart = this.cartRepo.create({user});
        return this.cartRepo.save(cart);
    }

}