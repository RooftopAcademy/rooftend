import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from '../services/cart.service';
import { User } from '../../users/entities/user.entity';
import { CaslModule } from '../../auth/casl/casl.module';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Cart } from '../entities/cart.entity';

describe('CartController', () => {
    let controller: CartController;
    const userId = 10;
    const newUser = new User();
    const mockUser = new User();
    mockUser.id = userId;
    newUser.id = 1;
    const request: any = {
      user: {
        result: newUser,
      },
    };

    const cartMock = plainToClass(Cart, ({
            
      id: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      amount: 555, 
      currencyCode: 'abc', 
      purchasedAt: null,
      user: newUser,
      
    }));

    const cartWithCartItemsMock = plainToClass(Cart, ({
      id: 3, 
      createdAt: Date.now(), 
      updatedAt: Date.now(), 
      amount: 555, 
      currencyCode: 'abc',
      purchasedAt: null,
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
  }))


    const mockCartService = {
        findCart: jest.fn(() => cartMock),

        findOne: jest.fn().mockImplementation(() => cartWithCartItemsMock),
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

    it('getCartById should return a cart and its cart-items given an id', async () => {
        expect(await controller.getCartById(request, 3)).toEqual(cartWithCartItemsMock);
        expect(mockCartService.findOne).toHaveBeenCalled();
    });

    it('getCart should return the latest valid  cart', async () => {
        expect(await controller.getCart(request)).toEqual(cartMock);
        expect(mockCartService.findCart).toHaveBeenCalled();
    });

    it('getCartById should return a ForbiddenError message', async () => {
        newUser.id = 42;
  
        try {
          expect(await controller.getCartById(request, 3)).toThrow(ForbiddenException);
        } catch (error) {
          expect(error.message).toBe('Forbidden');
        }
      });
  
      it('getCartById should return a NotFoundError message', async () => {
        mockCartService.findOne.mockImplementationOnce(() => {
          throw new NotFoundException('Not Found');
        });
  
        try {
          expect(await controller.getCartById(request, 3)).toThrow(NotFoundException);
        } catch (error) {
          expect(error.message).toEqual('Not Found');
        }
      });

      it('getCart should return a ForbiddenError message', async () => {
        newUser.id = 42;
  
        try {
          expect(await controller.getCart(request)).toThrow(ForbiddenException);
        } catch (error) {
          expect(error.message).toBe('Forbidden');
        }
      });
  
      it('getCart should return a NotFoundError message', async () => {
        mockCartService.findCart.mockImplementationOnce(() => {
          throw new NotFoundException('Not Found');
        });
  
        try {
          expect(await controller.getCart(request)).toThrow(NotFoundException);
        } catch (error) {
          expect(error.message).toEqual('Not Found');
        }
      });
});
    
