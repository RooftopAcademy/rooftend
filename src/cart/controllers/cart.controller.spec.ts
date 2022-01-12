import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from '../services/cart.service';
import { User } from '../../users/entities/user.entity';
import { CaslModule } from '../../auth/casl/casl.module';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('CartController', () => {
    let controller: CartController;
    const newUser = new User();
    newUser.id = 1;

    const mockCartService = {
        findCart: jest.fn(cart => ({
            
            id: Date.now(),
            created_at: Date.now(),
            updated_at: Date.now(),
            amount: 555, 
            currencyCode: 'abc', 
            purchasedAt: null,
            user: newUser,
            
        })),
        findCartById: jest.fn().mockImplementation((id) => ({
            id: 3, 
            created_at: Date.now(), 
            updated_at: Date.now(), 
            amount: 555, 
            currencyCode: 'abc', 
            user: newUser,
            cartItems : [
                {
                  id: 4,
                  quantity: 10,
                  subtotal: 1000,
                  createdAt: Date.now(),
                  updatedAt: Date.now()
                },
                {
                  id: 5,
                  quantity: 20,
                  subtotal: 100,
                  createdAt: Date.now(),
                  updatedAt: Date.now()
                },
                {
                  id: 6,
                  quantity: 2,
                  subtotal: 120,
                  createdAt: Date.now(),
                  updatedAt: Date.now()
                }
              ],
        })),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [CartService],
            imports: [CaslModule]
        }).overrideProvider(CartService)
        .useValue(mockCartService).compile();
        controller = module.get<CartController>(CartController);

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
      });

    it('should return a cart and its cart-items given an id', () => {
        expect(controller.getCartById(3)).toEqual({
        id: 3,
        created_at: expect.any(Number),
        updated_at: expect.any(Number),
        user: newUser,
        amount: 555,
        currencyCode: 'abc',
        cartItems: [
            {
              id: 4,
              quantity: 10,
              subtotal: 1000,
              createdAt: expect.any(Number),
              updatedAt: expect.any(Number)
            },
            {
              id: 5,
              quantity: 20,
              subtotal: 100,
              createdAt: expect.any(Number),
              updatedAt: expect.any(Number)
            },
            {
              id: 6,
              quantity: 2,
              subtotal: 120,
              createdAt: expect.any(Number),
              updatedAt: expect.any(Number)
            }
          ]
        });
        expect(mockCartService.findCartById).toHaveBeenCalled();
    });

    it('should return the latest valid  cart', () => {
        expect(controller.getCart()).toEqual({
        id: expect.any(Number),
        created_at: expect.any(Number),
        updated_at: expect.any(Number),
        user: newUser,
        amount: 555,
        currencyCode: 'abc',
        purchasedAt: null,
        });
        expect(mockCartService.findCart).toHaveBeenCalled();
    });

    it('should return a ForbiddenError message', async () => {
        mockCartService.findCartById.mockImplementationOnce(() => {
          throw new ForbiddenException();
        });
  
        try {
          expect(await controller.getCartById(3)).toThrow(ForbiddenException);
        } catch (error) {
          expect(error.message).toEqual('Forbidden');
        }
      });
  
      it('should return a NotFoundError message', async () => {
        mockCartService.findCartById.mockImplementationOnce(() => {
          throw new NotFoundException();
        });
  
        try {
          expect(await controller.getCartById(3)).toThrow(NotFoundException);
        } catch (error) {
          expect(error.message).toEqual('Not Found');
        }
      });
});
    
