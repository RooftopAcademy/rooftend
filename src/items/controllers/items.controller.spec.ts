import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { CaslModule } from '../../auth/casl/casl.module';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/entities/categories.entity';
import { User } from '../../users/entities/user.entity';

import { CreateItemDTO } from '../entities/create.item.dto';
import { Item } from '../entities/items.entity';

import { ItemsService } from '../services/items.service';
import { ItemsController } from './items.controller';

describe('ItemsController', () => {
  let controller: ItemsController;
  const mockUser = new User();
  mockUser.id = 1;

  const request: any = {
    user: new User()
  }
  request.user.id = 1;

  const paginatedList = {
    items: [
      {
        id: 2,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: 'Name',
        description: 'Des',
        price: 1,
        stock: 1,
        brandId: expect.any(Brand),
        user: request.user,
        categoryId: expect.any(Category),
        cartItemsId: [],
        questions: [],
      },
      {
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        brandId: expect.any(Brand),
        user: request.user,
        categoryId: expect.any(Category),
        cartItemsId: [],
        questions: [],
      },
    ],
    meta: {
      itemCount: 2,
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
    },
  }

  const genericItem = plainToClass(Item, {
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Name 2',
    description: 'Des 2',
    price: 2,
    stock: 2,
    user: mockUser,
  })


  const mockItemsService = {
    findAll: jest.fn().mockImplementation(() =>
      Promise.resolve(paginatedList),
    ),
    findOne: jest.fn().mockImplementation(() =>
      Promise.resolve(genericItem),
    ),
    create: jest.fn().mockImplementation((user, body) => {
      Object.assign(body, { id: 4, user });
      return Promise.resolve(body);
    }),
    update: jest.fn().mockImplementation((item, body) => Promise.resolve({
        ...item,
        ...body,
      })
    ),
    delete: jest.fn().mockImplementation(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
      imports: [CaslModule],
    })
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
      .compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('all', () => {
    it('should return an array of Items', async () => {
      expect(await controller.getAll(request, null, null, null)).toEqual(paginatedList);
    });
  });

  describe('one', () => {
    it('should return an Item', async () => {
      expect(await controller.getOne(3)).toEqual({
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: request.user,
      });
    });

    it('should return a ForbiddenError message', async () => {
      mockItemsService.findOne.mockImplementationOnce(() => {
        throw new ForbiddenException();
      });

      try {
        expect(await controller.getOne(10)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual('Forbidden');
      }
    });

    it('should return a NotFoundError message', async () => {
      mockItemsService.findOne.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      try {
        expect(await controller.getOne(10)).toThrow(NotFoundException);
      } catch (error) {
        expect(error.message).toEqual('Not Found');
      }
    });
  });

  describe('create', () => {
    it('should create a Item', async () => {
      const dto: CreateItemDTO = {
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        brandId: new Brand(),
        categoryId: new Category(),
      };

      expect(await controller.create(request, dto)).toEqual({
        id: 4,
        ...dto,
        user: request.user,
      });

      expect(mockItemsService.create).toHaveBeenCalledWith(
        expect.any(User),
        dto,
      );
    });
  });

  describe('update', () => {
    it('should update an Item', async () => {
      request.user.id = mockUser.id
      const item = {
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: request.user,
      };

      const dto = {
        price: 100,
        stock: 500,
      };

      expect(await controller.update(request, item.id, dto)).toEqual({
        ...item,
        price: 100,
        stock: 500,
      });

      expect(mockItemsService.update).toHaveBeenLastCalledWith(
        item,
        dto,
      );
    });

    it('should return a ForbiddenError message', async () => {
      request.user.id = mockUser.id + 1;

      try {
        expect(await controller.update(request, 10, {})).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual('Forbidden');
      }
    });

    it('should return a NotFoundError message', async () => {
      request.user.id = mockUser.id;
      mockItemsService.findOne.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      try {
        expect(await controller.update(request, 10, {})).toThrow(NotFoundException);
      } catch (error) {
        expect(error.message).toEqual('Not Found');
      }
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      expect(await controller.delete(request, 10)).toEqual(true);

      expect(mockItemsService.delete).toHaveBeenCalledWith(10);
    });

    it('should return a ForbiddenError message', async () => {
      mockItemsService.delete.mockImplementationOnce(() => {
        throw new ForbiddenException();
      });

      try {
        expect(await controller.delete(request, 10)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual('Forbidden');
      }
    });
  });
});
