import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import { Item } from '../../items/entities/items.entity';
import { ItemsService } from '../../items/services/items.service';
import { CartItem } from '../entities/cart-item.entity';
import { CartItemService } from './cart-item.service';

describe('CartItemService', () => {
  let service: CartItemService;

  const mockRepository = {
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        quantity: 1,
        subtotal: 123,
        item: { id: 1, price: 123, stock: 3 },
        itemId: 1,
        cart: { id: 1 },
        cartId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

    findOne: jest.fn().mockResolvedValue({
      id: 1,
      quantity: 1,
      subtotal: 123,
      item: plainToClass(Item, { id: 1, price: 123, stock: 3 }),
      itemId: 1,
      cart: { id: 1 },
      cartId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),

    create: jest.fn((entityLike) => plainToClass(CartItem, entityLike)),

    merge: jest.fn((mergeIntoEntity, entityLike) => {
      Object.assign(mergeIntoEntity, entityLike);

      return mergeIntoEntity;
    }),

    save: jest.fn(
      (ci: CartItem): Promise<CartItem> =>
        Promise.resolve({
          ...ci,
          id: ci.id ?? 1,
          cartId: ci.cartId ?? ci.cart.id,
          createdAt: ci.createdAt ?? new Date(),
          updatedAt: new Date(),
        }),
    ),

    delete: jest.fn().mockResolvedValue(new DeleteResult()),
  };

  const mockItemsService = {
    findOne: jest.fn(
      (id: number): Promise<Item> =>
        Promise.resolve(
          plainToClass(Item, {
            id,
            price: 123,
            stock: 3,
          }),
        ),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemService,
        ItemsService,
        {
          provide: getRepositoryToken(CartItem),
          useValue: mockRepository,
        },
      ],
    })
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
      .compile();

    service = module.get<CartItemService>(CartItemService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllFromCart', () => {
    it('should return cart items', async () => {
      await expect(service.findAllFromCart(1)).resolves.toEqual([
        {
          id: 1,
          quantity: 1,
          subtotal: 123,
          item: { id: 1, price: 123, stock: 3 },
          itemId: 1,
          cart: { id: 1 },
          cartId: 1,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);

      expect(mockRepository.find).toHaveBeenLastCalledWith({
        where: { cart: { id: 1 } },
        relations: ['item'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a cart item', async () => {
      await expect(service.findOne(1, 1)).resolves.toEqual({
        id: 1,
        quantity: 1,
        subtotal: 123,
        item: { id: 1, price: 123, stock: 3 },
        itemId: 1,
        cart: { id: 1 },
        cartId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(mockRepository.findOne).toHaveBeenLastCalledWith({
        where: {
          cart: { id: 1 },
          item: { id: 1 },
        },
        relations: ['item'],
      });
    });

    it('should throw a NotFoundException', () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);

      expect(service.findOne(1, 1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findById', () => {
    it('should return a cart item', async () => {
      await expect(service.findById(1)).resolves.toEqual({
        id: 1,
        quantity: 1,
        subtotal: 123,
        item: { id: 1, price: 123, stock: 3 },
        itemId: 1,
        cart: { id: 1 },
        cartId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(mockRepository.findOne).toHaveBeenLastCalledWith({ itemId: 1 });
    });
  });

  describe('create', () => {
    it('should create a cart item', async () => {
      await expect(
        service.create(1, { itemId: 1, quantity: 2 }),
      ).resolves.toEqual({
        id: 1,
        quantity: 2,
        subtotal: 246,
        cart: { id: 1 },
        cartId: 1,
        item: { id: 1, price: 123, stock: 3 },
        itemId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('not enough stock - should raise a forbidden exception', async () => {
      await expect(
        service.create(1, { itemId: 1, quantity: 4 }),
      ).rejects.toThrowError(ForbiddenException);
    });

    it('item not found - should raise a not found exception', async () => {
      mockItemsService.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(
        service.create(1, { itemId: 1, quantity: 1 }),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete the cart item successfully', async () => {
      await expect(service.delete(1, 1)).resolves.toBeInstanceOf(DeleteResult);

      expect(mockRepository.delete).toHaveBeenLastCalledWith({
        id: 1,
        quantity: 1,
        subtotal: 123,
        item: { id: 1, price: 123, stock: 3 },
        itemId: 1,
        cart: { id: 1 },
        cartId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should raise a not found exception', () => {
      mockRepository.findOne.mockRejectedValueOnce(new NotFoundException());

      expect(service.delete(1, 1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a cart item', async () => {
      await expect(service.update(1, 1, { quantity: 2 })).resolves.toEqual({
        id: 1,
        quantity: 2,
        subtotal: 246,
        cart: { id: 1 },
        cartId: 1,
        item: { id: 1, price: 123, stock: 3 },
        itemId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('not enough stock - should raise a forbidden exception', async () => {
      await expect(service.update(1, 1, { quantity: 4 })).rejects.toThrowError(
        ForbiddenException,
      );
    });
  });
});
