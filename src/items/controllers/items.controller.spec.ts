import { ForbiddenException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CaslModule } from '../../auth/casl/casl.module';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/entities/categories.entity';
import { User } from '../../users/entities/user.entity';

import { CreateItemDTO } from '../entities/create.item.dto';

import { ItemsService } from '../services/items.service';
import { ItemsController } from './items.controller';

describe('ItemsController', () => {
  let controller: ItemsController;
  const newUser = new User();
  newUser.id = 1;

  const mockItemsService = {
    findAll: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: 'Name',
          description: 'Des',
          price: 1,
          stock: 1,
          user: newUser,
        },
        {
          id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: 'Name 2',
          description: 'Des 2',
          price: 2,
          stock: 2,
          user: newUser,
        },
      ]),
    ),
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: newUser,
      }),
    ),
    create: jest.fn().mockImplementation((user, body) => {
      Object.assign(body, { id: 4, user });
      return Promise.resolve(body);
    }),
    update: jest.fn().mockImplementation((user, id, body) => {
      return Promise.resolve({
        ...{
          id: id,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: 'Name 2',
          description: 'Des 2',
          price: 2,
          stock: 2,
          user,
        },
        ...body,
      });
    }),
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
      expect(await controller.getAll()).toEqual([
        {
          id: 2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          title: 'Name',
          description: 'Des',
          price: 1,
          stock: 1,
          user: newUser,
        },
        {
          id: 3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          title: 'Name 2',
          description: 'Des 2',
          price: 2,
          stock: 2,
          user: newUser,
        },
      ]);
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
        user: newUser,
      });
    });

    it('should return a ForbiddenError message', async () => {
      mockItemsService.findOne.mockImplementationOnce(() => { throw new ForbiddenException() });

      try {
        expect(await controller.getOne(10)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual("Forbidden");
      }
    });

    it('should return a NotFoundError message', async () => {
      mockItemsService.findOne.mockImplementationOnce(() => { throw new NotFoundException() });

      try {
        expect(await controller.getOne(10)).toThrow(NotFoundException);
      } catch (error) {
        expect(error.message).toEqual("Not Found");
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

      expect(await controller.create(dto)).toEqual({
        id: 4,
        ...dto,
        user: newUser,
      });

      expect(mockItemsService.create).toHaveBeenCalledWith(
        expect.any(User),
        dto,
      );
    });
  });

  describe('update', () => {
    it('should update an Item', async () => {
      const item = {
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: newUser,
      };

      const dto = {
        price: 100,
        stock: 500,
      };

      expect(await controller.update(item.id, dto)).toEqual({
        ...item,
        price: 100,
        stock: 500,
      });

      expect(mockItemsService.update).toHaveBeenCalledWith(
        expect.any(User),
        item.id,
        dto,
      );
    });

    it('should return a ForbiddenError message', async () => {
      mockItemsService.update.mockImplementationOnce(() => { throw new ForbiddenException() });
      const dto = {
        stock: 500,
      };

      try {
        expect(await controller.update(10, dto)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual("Forbidden");
        expect(mockItemsService.update).toHaveBeenCalledWith(
          expect.any(User),
          10,
          dto,
        );
      }
    });

    it('should return a NotFoundError message', async () => {
      mockItemsService.update.mockImplementationOnce(() => { throw new NotFoundException() });
      const dto = {
        stock: 500,
      };

      try {
        expect(await controller.update(10, dto)).toThrow(NotFoundException);
      } catch (error) {
        expect(error.message).toEqual("Not Found");
        expect(mockItemsService.update).toHaveBeenCalledWith(
          expect.any(User),
          10,
          dto,
        );
      }
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      expect(await controller.delete(10)).toEqual(true);

      expect(mockItemsService.delete).toHaveBeenCalledWith(
        expect.any(User),
        10,
      );
    });

    it('should return a ForbiddenError message', async () => {
      mockItemsService.delete.mockImplementationOnce(() => { throw new ForbiddenException() });

      try {
        expect(await controller.delete(10)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual("Forbidden");
      }
    });
  });
});
