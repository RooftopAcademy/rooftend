import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { CaslModule } from '../../auth/casl/casl.module';
import { Cart } from '../../cart/entities/cart.entity';
import { CartService } from '../../cart/services/cart.service';
import STATUS from '../../statusCodes/statusCodes';
import { User } from '../../users/entities/user.entity';
import { CartItem } from '../entities/cart-item.entity';
import { CreateCartItemDTO } from '../entities/create-cart-item.dto';
import { UpdateCartItemDTO } from '../entities/update-cart-item.dto';
import { CartItemService } from '../services/cart-item.service';
import { CartItemController } from './cart-item.controller';

describe('CartItemController', () => {
  let controller: CartItemController;

  const mockUser = new User();
  mockUser.id = 1;

  const mockUser2 = new User();
  mockUser2.id = 2;

  const req: any = { user: mockUser };
  const req2: any = { user: mockUser2 };

  const mockCartService = {
    findOne: jest.fn(
      (id: number): Promise<Cart> =>
        Promise.resolve(
          plainToClass(Cart, {
            id,
            user: mockUser,
          }),
        ),
    ),
  };

  const mockCartItemService = {
    findAllFromCart: jest.fn(
      (cartId: number): Promise<CartItem[]> =>
        Promise.resolve([
          plainToClass(CartItem, {
            id: 1,
            quantity: 1,
            subtotal: 123,
            item: { id: 1, price: 123 },
            itemId: 1,
            cartId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        ]),
    ),

    findOne: jest.fn(
      (itemId: number, cartId: number): Promise<CartItem> =>
        Promise.resolve(
          plainToClass(CartItem, {
            id: 1,
            quantity: 1,
            subtotal: 123,
            item: { id: itemId, price: 123 },
            itemId,
            cartId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        ),
    ),

    create: jest.fn(
      (cartId: number, body: CreateCartItemDTO): Promise<CartItem> =>
        Promise.resolve(
          plainToClass(CartItem, {
            id: 1,
            quantity: body.quantity,
            subtotal: 143734.3,
            createdAt: new Date(),
            updatedAt: new Date(),
            item: {
              id: body.itemId,
            },
            itemId: body.itemId,
            cartId,
          }),
        ),
    ),

    update: jest.fn(
      (
        cartId: number,
        itemId: number,
        body: UpdateCartItemDTO,
      ): Promise<CartItem> =>
        Promise.resolve(
          plainToClass(CartItem, {
            id: 1,
            quantity: body.quantity,
            subtotal: 143734.3,
            createdAt: new Date(),
            updatedAt: new Date(),
            item: {
              id: itemId,
            },
            itemId: itemId,
            cartId,
          }),
        ),
    ),

    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemController],
      providers: [CartService, CartItemService],
      imports: [CaslModule],
    })
      .overrideProvider(CartService)
      .useValue(mockCartService)
      .overrideProvider(CartItemService)
      .useValue(mockCartItemService)
      .compile();

    controller = module.get<CartItemController>(CartItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should work correctly', async () => {
      await expect(controller.getAll(req, 1)).resolves.toEqual([
        {
          id: 1,
          quantity: 1,
          subtotal: 123,
          item: { id: 1, price: 123 },
          itemId: 1,
          cartId: 1,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);

      expect(mockCartItemService.findAllFromCart).toHaveBeenLastCalledWith(1);
    });

    it('should not authorize', async () => {
      await expect(controller.getAll(req2, 1)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should respond with 404', async () => {
      mockCartService.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.getAll(req, 2)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('getOne', () => {
    it('should work correctly', async () => {
      await expect(controller.getOne(req, 1, 1)).resolves.toEqual({
        id: 1,
        quantity: 1,
        subtotal: 123,
        item: { id: 1, price: 123 },
        itemId: 1,
        cartId: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(mockCartItemService.findAllFromCart).toHaveBeenLastCalledWith(1);
    });

    it('should not authorize', async () => {
      await expect(controller.getOne(req2, 1, 1)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should respond with 404 - cart not found', async () => {
      mockCartService.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.getOne(req, 2, 1)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should respond with 404 - item not found', async () => {
      mockCartItemService.findOne.mockRejectedValueOnce(
        new NotFoundException(),
      );

      await expect(controller.getOne(req, 1, 2)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    const dto: CreateCartItemDTO = { itemId: 1, quantity: 1 };

    it('should create an item', async () => {
      /**
       * if item is not found, it should create one.
       * if not, update the already existing one
       */
      mockCartItemService.findOne.mockRejectedValueOnce(
        new NotFoundException(),
      );

      await expect(controller.create(req, 1, dto)).resolves.toEqual({
        id: 1,
        ...dto,
        cartId: 1,
        subtotal: 143734.3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        item: {
          id: 1,
        },
      });

      expect(mockCartItemService.create).toHaveBeenLastCalledWith(1, dto);
    });

    it('should not authorize', async () => {
      await expect(controller.create(req2, 1, dto)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should respond with 403 - inactive item or not enough stock', async () => {
      mockCartItemService.findOne.mockRejectedValueOnce(
        new NotFoundException(),
      );

      mockCartItemService.create.mockRejectedValueOnce(
        new ForbiddenException(),
      );

      await expect(controller.create(req, 1, dto)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should respond with 404 - cart not found', async () => {
      mockCartService.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.create(req, 2, dto)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should respond with 404 - item not found', async () => {
      mockCartItemService.findOne.mockRejectedValueOnce(
        new NotFoundException(),
      );

      mockCartItemService.create.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.create(req, 1, dto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    const dto: UpdateCartItemDTO = { quantity: 1 };

    it('should update successfully', async () => {
      await expect(controller.update(req, 1, 1, dto)).resolves.toEqual({
        id: 1,
        ...dto,
        cartId: 1,
        subtotal: 143734.3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        item: {
          id: 1,
        },
        itemId: 1,
      });

      expect(mockCartItemService.update).toHaveBeenLastCalledWith(1, 1, dto);
    });

    it('should not authorize', async () => {
      await expect(controller.update(req2, 1, 1, dto)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should respond with 403 - inactive item or not enough stock', async () => {
      mockCartItemService.update.mockRejectedValueOnce(
        new ForbiddenException(),
      );

      await expect(controller.update(req, 1, 1, dto)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should respond with 404 - cart not found', async () => {
      mockCartService.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.update(req, 2, 1, dto)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should respond with 404 - item not found', async () => {
      mockCartItemService.update.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.update(req, 1, 2, dto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      await expect(controller.delete(req, 1, 1)).resolves.toEqual(
        STATUS.DELETED,
      );

      expect(mockCartItemService.delete).toHaveBeenLastCalledWith(1, 1);
    });

    it('should not authorize', async () => {
      await expect(controller.delete(req2, 1, 1)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should respond with 404 - cart not found', async () => {
      mockCartService.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.delete(req, 2, 1)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should respond with 404 - item not found', async () => {
      mockCartItemService.delete.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.delete(req, 1, 2)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
