import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { CaslModule } from '../../auth/casl/casl.module';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/entities/categories.entity';
import { User } from '../../users/entities/user.entity';

import { CreateItemDto } from '../entities/create.item.dto';
import { UpdateItemDto } from '../entities/update.item.dto';
import { Item } from '../entities/items.entity';

import { ItemsService } from '../services/items.service';
import { ItemsController } from './items.controller';
import STATUS from '../../statusCodes/statusCodes';

describe('ItemsController', () => {
  let controller: ItemsController;
  const mockUser = new User();
  mockUser.id = 1;

  const request: any = {
    user: mockUser,
  };

  const mockUser2 = new User();
  mockUser2.id = 2;

  const request2: any = { user: mockUser2 };

  const paginatedList = {
    items: [
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Name',
        description: 'Des',
        price: 1,
        stock: 1,
        brand: new Brand(),
        user: request.user,
        category: new Category(),
      },
      {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        brand: new Brand(),
        user: request.user,
        category: new Category(),
      },
    ],
    meta: {
      itemCount: 2,
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
    },
  };

  const genericItem = plainToClass(Item, {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Name 2',
    description: 'Des 2',
    price: 2,
    stock: 2,
    user: mockUser,
    category: new Category(),
    brand: new Brand(),
  });

  const mockItemsService = {
    findAll: jest.fn().mockResolvedValue(paginatedList),
    findOne: jest.fn().mockResolvedValue(genericItem),
    create: jest.fn((user: User, body: CreateItemDto) =>
      Promise.resolve({
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: body.title,
        description: body.description,
        price: body.price,
        stock: body.stock,
        brand: new Brand(),
        user,
        category: new Category(),
      }),
    ),
    update: jest.fn().mockResolvedValue((item: Item, body: UpdateItemDto) => ({
      ...item,
      ...body,
    })),
    delete: jest.fn(),
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
      expect(await controller.getAll(request)).toEqual(paginatedList);

      expect(mockItemsService.findAll).toHaveBeenCalled();
      expect(mockItemsService.findAll).toHaveBeenLastCalledWith(
        {
          exclude: true,
          sellerId: undefined,
          categoryId: undefined,
          orderBy: undefined,
          dir: 'ASC',
        },
        {
          limit: 10,
          page: 1,
        },
        request.user,
      );
    });
  });

  describe('one', () => {
    it('should return an Item', async () => {
      expect(await controller.getOne(1)).toEqual({
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: request.user,
        category: expect.any(Category),
        brand: expect.any(Brand),
      });
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
    const dto: CreateItemDto = {
      title: 'Name 2',
      description: 'Des 2',
      price: 2,
      stock: 2,
      brandId: 1,
      categoryId: 1,
    };

    it('should create a Item', async () => {
      console.log(await mockItemsService.create(request.user, dto));

      expect(await controller.create(request, dto)).toEqual({
        id: 4,
        title: dto.title,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        user: request.user,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        category: expect.any(Category),
        brand: expect.any(Brand),
      });

      expect(mockItemsService.create).toHaveBeenCalledWith(request.user, dto);
    });

    it('should return an UnprocessableEntityException', async () => {
      mockItemsService.create.mockRejectedValueOnce(
        new UnprocessableEntityException(),
      );

      await expect(controller.create(request, dto)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
  });

  describe('update', () => {
    it('should update an Item', async () => {
      const item: Item = plainToClass(Item, {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: request.user,
      });

      const dto: UpdateItemDto = {
        price: 100,
        stock: 500,
      };

      mockItemsService.findOne.mockResolvedValueOnce(item);

      expect(await controller.update(request, item.id, dto)).toEqual(STATUS.OK);

      expect(mockItemsService.update).toHaveBeenLastCalledWith(item, dto);
    });

    it('should return a ForbiddenError message', async () => {
      try {
        expect(await controller.update(request2, 10, null)).toThrow(
          ForbiddenException,
        );
      } catch (error) {
        expect(error.message).toEqual('Forbidden');
      }
    });

    it('should return a NotFoundError message', async () => {
      mockItemsService.findOne.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      try {
        expect(await controller.update(request2, 10, {})).toThrow(
          NotFoundException,
        );
      } catch (error) {
        expect(error.message).toEqual('Not Found');
      }
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      expect(await controller.delete(request, 1)).toEqual(STATUS.DELETED);

      expect(mockItemsService.delete).toHaveBeenCalledWith({
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        category: expect.any(Category),
        brand: expect.any(Brand),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: mockUser,
      });
    });

    it('should return a ForbiddenException', async () => {
      await expect(controller.delete(request2, 1)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should return a NotFoundException', async () => {
      mockItemsService.findOne.mockRejectedValueOnce(new NotFoundException());

      await expect(controller.delete(request, 10)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
