import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/entities/categories.entity';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { CreateItemDto } from '../entities/create.item.dto';
import { Item } from '../entities/items.entity';

const userId = 1;
const newUser = plainToClass(User, {
  id: userId,
  username: null,
  password: '5vOC1yGAT2Km0Lt',
  email: 'Dewitt.Turcotte52@hotmail.com',
});

const list = {
  items: [
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
  ],
  meta: {
    itemCount: 2,
    totalItems: 2,
    totalPages: 1,
    currentPage: 1,
  },
};
jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockReturnValue(list),
}));

// imported here so the mock in line 60 works
import { ItemsService } from './items.service';

describe('ItemsService', () => {
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

  const genericBrand: Brand = {
    id: 1,
    name: 'Generic brand',
    photoUrl: 'https://site.com/photos/123',
  };

  const genericCategory: Category = {
    id: 1,
    name: 'Generic category',
    parentCategory: null,
    subCategories: [],
  };

  let service: ItemsService;

  const mockItemsRepository = {
    findOne: jest.fn(() => Promise.resolve(genericItem)),
    create: jest.fn((body: CreateItemDto) => ({
      id: 4,
      title: body.title,
      description: body.description,
      price: body.price,
      stock: body.stock,
    })),
    save: jest.fn((item) => Promise.resolve(item)),
    update: jest.fn().mockResolvedValue(new UpdateResult()),
    delete: jest.fn().mockResolvedValue(new DeleteResult()),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
    })),
  };

  const mockBrandsRepository = {
    findOne: jest.fn(
      (id: number): Promise<Brand | null> =>
        Promise.resolve(id == 1 ? genericBrand : null),
    ),
  };

  const mockCategoriesRepository = {
    findOne: jest.fn(
      (id: number): Promise<Category | null> =>
        Promise.resolve(id == 1 ? genericCategory : null),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemsRepository,
        },
        {
          provide: getRepositoryToken(Brand),
          useValue: mockBrandsRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoriesRepository,
        },
        CaslAbilityFactory,
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('all', () => {
    it('should return an array of Items', async () => {
      expect(await service.findAll({}, { limit: 10, page: 1 })).toEqual({
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
        ],
        meta: {
          itemCount: 2,
          totalItems: 2,
          totalPages: 1,
          currentPage: 1,
        },
      });
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
      const dto: CreateItemDto = {
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        brandId: 1,
        categoryId: 1,
      };

      const expected = {
        id: 4,
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        user: newUser,
        category: genericCategory,
        brand: genericBrand,
      };

      expect(await service.create(newUser, dto)).toEqual(expected);

      expect(mockItemsRepository.create).toHaveBeenCalledWith(dto);
      expect(mockItemsRepository.save).toHaveBeenCalledWith(expected);
    });

    it('Wrong category id - Should throw UnprocessableEntityExepction', async () => {
      const dto: CreateItemDto = {
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        categoryId: 2,
      };

      await expect(service.create(newUser, dto)).rejects.toThrowError(
        UnprocessableEntityException,
      );

      expect(mockBrandsRepository.findOne).not.toHaveBeenCalled();
    });

    it('Wrong brand id - Should throw UnprocessableEntityExepction', async () => {
      const dto: CreateItemDto = {
        title: 'Name 2',
        description: 'Des 2',
        price: 2,
        stock: 2,
        categoryId: 1,
        brandId: 2,
      };

      await expect(service.create(newUser, dto)).rejects.toThrowError(
        UnprocessableEntityException,
      );

      expect(mockBrandsRepository.findOne).toHaveBeenLastCalledWith(
        dto.brandId,
      );
    });
  });

  describe('update', () => {
    it('should update an Item', async () => {
      const dto = {
        price: 100,
        stock: 500,
      };

      expect(await service.update(genericItem, dto)).toBeInstanceOf(
        UpdateResult,
      );

      expect(mockItemsRepository.update).toHaveBeenCalledWith(genericItem, dto);
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      expect(await service.delete(genericItem)).toBeInstanceOf(DeleteResult);

      expect(mockItemsRepository.delete).toHaveBeenLastCalledWith(genericItem);
    });
  });
});
