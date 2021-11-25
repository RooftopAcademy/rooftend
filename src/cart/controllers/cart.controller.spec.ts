import {Test, TestingModule} from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from '../services/cart.service';
import { Any } from 'typeorm';
import { Cart } from '../entities/cart.entity';

describe('CartController', () => {
    let controller: CartController;
    const mockCartService = {
        create: jest.fn(cart => {
            return {
                id: Date.now(),
                created_at: Date.now(),
                updated_at: Date.now(),
                ...cart
            }
        }),
        update: jest.fn((id, cart) => ({
            id,
            ...cart
        })).mockImplementation()
    }

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [CartService],
        }).overrideProvider(CartService).useValue(mockCartService).compile();

        controller = module.get<CartController>(CartController);
    });

    it('should be defined', () =>{
        expect(controller).toBeDefined();
    });

    it('should create a cart', () => {
        const cart = {currencyCode: 'ab1', amount: 555, userId : 1};
        expect(controller.create(cart)).toEqual({
            id: expect.any(Number),
            created_at: expect.any(Number),
            updated_at: expect.any(Number),
            userId: cart.userId,
            amount: cart.amount,
            currencyCode : cart.currencyCode,

        });
        expect(mockCartService.create).toHaveBeenCalledWith(cart);
    });

    it('should update a cart',() => {
        const cart1 = {currencyCode: 'ab1', amount: 555, userId : 1, id: 1};
        controller.create(cart1);
        const cart2 = {currencyCode: 'a71', amount: 777, userId: 7};
        expect(controller.update(1, cart2)).toEqual({
            id: 1,
            created_at: expect.any(Number),
            updated_at: expect.any(Number),
            amount: cart2.amount,
            currencyCode : cart2.currencyCode,
            userId: cart2.userId,
            });
        expect(mockCartService.update).toHaveBeenCalled();
    })

});