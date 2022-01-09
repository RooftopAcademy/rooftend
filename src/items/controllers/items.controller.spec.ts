import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { request, response } from 'express';

import { CaslModule } from '../../auth/casl/casl.module';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/categories.entity';
import { User } from '../../users/entities/user.entity';

import { CreateItemDTO } from '../entities/create.item.dto';

import { ItemsService } from '../services/items.service';
import { ItemsController } from './items.controller';

describe('ItemsController', () => {
  let controller: ItemsController;
  const newUser = new User();
  newUser.id = 1;

  const mockItemsService = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve([{
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Name",
      description: "Des",
      price: 1,
      stock: 1,
      brandId: 1,
      userId: 1,
      categoryId: 1,
      cartItemsId: 1,
      questions: []
    }, {
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Name 2",
      description: "Des 2",
      price: 2,
      stock: 2,
      brandId: 2,
      userId: newUser.id,
      categoryId: 2,
      cartItemsId: 2,
      questions: []
    }])),
    findOne: jest.fn().mockImplementation((id) => Promise.resolve({
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "Name 2",
      description: "Des 2",
      price: 2,
      stock: 2,
      brandId: 2,
      userId: newUser.id,
      categoryId: 2,
      cartItemsId: 2,
      questions: []
    })),
    create: jest.fn().mockImplementation((user, body) => {
      Object.assign(body, { id: 4, userId: user.id })
      return Promise.resolve(body)
    }),
    update: jest.fn().mockImplementation((user, id, body) => {
      return Promise.resolve({
        ...({
          id: id,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: "Name 2",
          description: "Des 2",
          price: 2,
          stock: 2,
          brandId: 2,
          userId: user.id,
          categoryId: 2,
          cartItemsId: 2,
          questions: []
        }),
        ...body
      })
    }),
    delete: jest.fn().mockImplementation((user, id) => true),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
      imports: [CaslModule]
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
      expect(await controller.getAll()).toEqual([{
        id: 2,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: "Name",
        description: "Des",
        price: 1,
        stock: 1,
        brandId: 1,
        userId: 1,
        categoryId: 1,
        cartItemsId: 1,
        questions: []
      }, {
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: "Name 2",
        description: "Des 2",
        price: 2,
        stock: 2,
        brandId: 2,
        userId: newUser.id,
        categoryId: 2,
        cartItemsId: 2,
        questions: []
      }]);
    });
  });

  describe('one', () => {
    it('should return an Item', async () => {
      expect(await controller.getOne(request, 3, response)).toEqual({
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: "Name 2",
        description: "Des 2",
        price: 2,
        stock: 2,
        brandId: 2,
        userId: newUser.id,
        categoryId: 2,
        cartItemsId: 2,
        questions: []
      });
    });

    it('should return a NotFoundError message', async () => {
      mockItemsService.findOne.mockImplementationOnce(() => { throw new HttpException('Not Found', HttpStatus.NOT_FOUND); });

      expect(await controller.getOne(request, 10, response)).toEqual("Not Found");
    });
  });

  describe('create', () => {
    it('should create a Item', async () => {
      const dto: CreateItemDTO = {
        title: "Name 2",
        description: "Des 2",
        price: 2,
        stock: 2,
        brandId: new Brand,
        categoryId: new Category,
      };

      expect(await controller.create(request, dto)).toEqual({
        id: 4,
        ...dto,
        userId: newUser.id
      });

      expect(mockItemsService.create).toHaveBeenCalledWith(expect.any(User), dto);
    });
  });

  describe('update', () => {
    it('should update an Item', async () => {
      const item = {
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: "Name 2",
        description: "Des 2",
        price: 2,
        stock: 2,
        brandId: 2,
        userId: newUser.id,
        categoryId: 2,
        cartItemsId: 2,
        questions: []
      }

      const dto = {
        price: 100,
        stock: 500
      };

      expect(await controller.update(request, item.id, dto, response)).toEqual({ ...item, price: 100, stock: 500 });

      expect(mockItemsService.update).toHaveBeenCalledWith(expect.any(User), item.id, dto);
    });

    it('should return ForbiddenError message', async () => {
      mockItemsService.update.mockImplementationOnce(() => { throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); });
      const dto = {
        stock: 500
      };

      expect(await controller.update(request, newUser.id + 1, dto, response)).toEqual("Forbidden");

      expect(mockItemsService.update).toHaveBeenCalledWith(expect.any(User), newUser.id + 1, dto);
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      expect(await controller.delete(request, 10, response)).toEqual(true);

      expect(mockItemsService.delete).toHaveBeenCalledWith(expect.any(User), 10);
    });

    it('should return ForbiddenError message', async () => {
      mockItemsService.delete.mockImplementationOnce(() => { throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); });
      expect(await controller.delete(request, 10, response)).toEqual("Forbidden");

      expect(mockItemsService.delete).toHaveBeenCalledWith(expect.any(User), 10);
    });
  });
});
