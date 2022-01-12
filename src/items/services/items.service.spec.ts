import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/entities/categories.entity';
import { User } from '../../users/entities/user.entity';
import { CreateItemDTO } from '../entities/create.item.dto';
import { Item } from '../entities/items.entity';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  const userId = 1;
  const newUser = plainToClass(User, {
    id: userId,
    username: null,
    password: '5vOC1yGAT2Km0Lt',
    email: 'Dewitt.Turcotte52@hotmail.com',
  });
  const mockUser = plainToClass(User, {
    id: userId,
    username: null,
    password: '5vOC1yGAT2Km0Lt',
    email: 'Dewitt.Turcotte52@hotmail.com',
  });

  const genericItem = plainToClass(Item, {
    id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Name 2',
    description: 'Des 2',
    price: 2,
    stock: 2,
    user: mockUser,
  });

  const mockItemsRepository = {
    find: jest.fn(() =>
      Promise.resolve([
        {
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: 'Name',
          description: 'Des',
          price: 1,
          stock: 1,
          brandId: new Brand(),
          user: newUser,
          categoryId: new Category(),
          cartItemsId: [],
          questions: [],
        },
        {
          id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          title: 'Name 2',
          description: 'Des 2',
          price: 2,
          stock: 2,
          brandId: new Brand(),
          user: newUser,
          categoryId: new Category(),
          cartItemsId: [],
          questions: [],
        },
      ]),
    ),
    findOne: jest.fn(() => Promise.resolve(genericItem)),
    create: jest.fn((body) => Object.assign(body, { id: 4 })),
    merge: jest.fn((item, body) => Object.assign({ item, body })),
    save: jest.fn((item) => Promise.resolve(item)),
    delete: jest.fn(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemsRepository,
        },
        CaslAbilityFactory,
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('all', () => {
    it('should return an array of Items', async () => {
      expect(await service.findAll()).toEqual([
        {
          id: 2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          title: 'Name',
          description: 'Des',
          price: 1,
          stock: 1,
          brandId: expect.any(Brand),
          user: newUser,
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
          user: newUser,
          categoryId: expect.any(Category),
          cartItemsId: [],
          questions: [],
        },
      ]);
    });
  });

  describe('one', () => {
    it('should return an Item', async () => {
      expect(await service.findOne(3)).toEqual({
        id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: mockUser,
      });
    });

    it('should throw a NotFoundException', async () => {
      mockItemsRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.findOne(10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Item Not Found');
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

      const expected = {
        id: 4,
        ...dto,
        user: newUser,
      };

      expect(await service.create(newUser, dto)).toEqual(expected);

      expect(mockItemsRepository.create).toHaveBeenCalledWith(dto);
      expect(mockItemsRepository.save).toHaveBeenCalledWith(expected);
    });
  });

  describe('update', () => {
    it('should update an Item', async () => {
      newUser.id = userId;
      const dto = {
        price: 100,
        stock: 500,
      };

      const expected = {
        ...genericItem,
        ...dto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockItemsRepository.save.mockReturnValueOnce(
        Promise.resolve({ ...genericItem, ...dto }),
      );

      expect(await service.update(newUser, genericItem.id, dto)).toEqual(
        expected,
      );

      expect(mockItemsRepository.findOne).toHaveBeenCalledWith(genericItem.id);
      expect(mockItemsRepository.merge).toHaveBeenCalledWith(genericItem, dto);
    });

    it('should throw ForbiddenException', async () => {
      newUser.id = userId + 1;
      const dto = {
        stock: 500,
      };

      try {
        expect(await service.update(newUser, genericItem.id, dto)).toThrow(
          ForbiddenException,
        );
      } catch (err) {
        expect(err.message).toEqual('Forbidden');
      }

      expect(mockItemsRepository.findOne).toHaveBeenCalledWith(genericItem.id);
      expect(mockItemsRepository.merge).toHaveBeenCalledTimes(1);
      expect(mockItemsRepository.save).toHaveBeenCalledTimes(2);
    });

    it('should throw NotFoundException', async () => {
      mockItemsRepository.findOne.mockReturnValueOnce(null);
      const dto = {
        stock: 500,
      };

      try {
        expect(await service.update(newUser, genericItem.id, dto)).toThrow(
          NotFoundException,
        );
      } catch (err) {
        expect(err.message).toEqual('Item Not Found');
      }

      expect(mockItemsRepository.findOne).toHaveBeenCalledWith(genericItem.id);
      expect(mockItemsRepository.merge).toHaveBeenCalledTimes(1);
      expect(mockItemsRepository.save).toHaveBeenCalledTimes(2);
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      newUser.id = userId;
      expect(await service.delete(newUser, genericItem.id)).toEqual(true);

      expect(mockItemsRepository.findOne).toHaveBeenCalledWith(genericItem.id);
      expect(mockItemsRepository.delete).toHaveBeenCalled();
    });

    it('should throw ForbiddenException', async () => {
      newUser.id = userId + 1;

      try {
        expect(await service.delete(newUser, genericItem.id)).toThrow(
          ForbiddenException,
        );
      } catch (err) {
        expect(err.message).toBe('Forbidden');
      }

      expect(mockItemsRepository.findOne).toHaveBeenCalledWith(genericItem.id);
      expect(mockItemsRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
