import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from '../services/cart.service';
import { Any } from 'typeorm';

describe('CartController', () => {
  let controller: CartController;
  const mockCartService = {
    create: jest.fn((cart) => {
      return {
        id: Date.now(),
        created_at: Date.now(),
        updated_at: Date.now(),
        ...cart,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    })
      .overrideProvider(CartService)
      .useValue(mockCartService)
      .compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cart', () => {
    const cart = { currencyCode: 'ab1', ammount: 555, userId: 1 };
    expect(controller.create(cart)).toEqual({
      id: expect.any(Number),
      created_at: expect.any(Number),
      updated_at: expect.any(Number),
      userId: cart.userId,
      ammount: cart.ammount,
      currencyCode: cart.currencyCode,
    });
    expect(mockCartService.create).toHaveBeenCalledWith(cart);
  });
});
