import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from '../services/cart.service';

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
        findOne: jest.fn().mockImplementation((id) => ({
            id, 
            created_at: Date.now(), 
            updated_at: Date.now(), 
            amount: 555, 
            currencyCode: 'abc', 
            userId: 1 
        })),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [CartService],
        }).overrideProvider(CartService)
        .useValue(mockCartService).compile();
        controller = module.get<CartController>(CartController);

    });

    it('should create a cart', () => {
        const cart = { currencyCode: 'ab1', amount: 555, userId: 1 };
        expect(controller.create(cart)).toEqual({
            id: expect.any(Number),
            created_at: expect.any(Number),
            updated_at: expect.any(Number),
            userId: cart.userId,
            amount: cart.amount,
            currencyCode: cart.currencyCode,

        });
        expect(mockCartService.create).toHaveBeenCalledWith(cart);
    });


    it('should find a cart and return it', () => {
        const cart = { currencyCode: 'abc', amount: 555, userId: 1 };
        expect(controller.getOne(17)).toEqual({
        id: 17,
        created_at: expect.any(Number),
        updated_at: expect.any(Number),
        userId: cart.userId,
        amount: cart.amount,
        currencyCode: cart.currencyCode,
        });
        expect(mockCartService.findOne).toHaveBeenCalled();
    });
    
});