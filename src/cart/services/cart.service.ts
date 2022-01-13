import { subject } from '@casl/ability';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { CartItemService } from '../../cart-item/services/cart-item.service';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../entities/cart.entity';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart) private cartRepo: Repository<Cart>,
        private readonly caslAbilityFactory: CaslAbilityFactory,
        private cartItemService: CartItemService) {}

    async findCart(user:User): Promise<Cart> {
        const cart = await this.cartRepo.findOne({select: ["id", "amount", "currencyCode", "user"] ,where: { purchasedAt: null }});
        if (!cart){ throw new NotFoundException('Valid cart not found')};
        cart.user.id = Number(cart.user.id);
        const ability = this.caslAbilityFactory.createForUser(user);
        if (ability.cannot(Permission.Read, subject('Cart', cart))){
            throw new ForbiddenException()
        };
        return cart;
        
    }
    
    async findCartById(user: User, id: number): Promise<Cart> {
        const cart: Cart = await this.cartRepo.findOne(id);
        if (!cart) {throw new NotFoundException('Valid cart not found')};
        cart.cartItems = await this.cartItemService.findAll(id);
        cart.user.id = Number(cart.user.id);
        const ability = this.caslAbilityFactory.createForUser(user);
        console.log(ability.can(Permission.Read, subject('Cart', cart)));
        console.log(ability.relevantRuleFor(Permission.Read, subject('Cart', cart)))
        if (ability.cannot(Permission.Read, subject('Cart', cart))){
            throw new ForbiddenException();
        }
        return cart;
    }

    async findOne(id:number): Promise<Cart>{
        const cart: Cart = await this.cartRepo.findOne(id);
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
