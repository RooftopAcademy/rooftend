const itemList = [
  {
    id: 1,
    name: 'TECHNOLOGY',
    subCategories: [
      {
        id: 12,
        name: 'CELL PHONES AND TELEPHONES',
      },
      {
        id: 13,
        name: 'COMPUTING',
      },
    ],
  },
  {
    id: 2,
    name: 'REAL STATE',
    subCategories: [
      {
        id: 14,
        name: 'DEPARTMENTS',
      },
      {
        id: 15,
        name: 'HOUSES',
      },
    ],
  },
];
const list = {
  items: itemList.slice(0, 2),
  meta: {
    itemCount: 2,
    totalItems: 2,
    totalPages: 1,
    currentPage: 1,
  },
};
jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue(list),
}));
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Category } from '../entities/categories.entity';
import { CategoriesService } from './categories.service';
describe('CategoriesService', () => {
  let service: CategoriesService;
  const mockCategoryRepository = {
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        name: 'TECHNOLOGY',
        subCategories: [
          {
            id: 12,
            name: 'CELL PHONES AND TELEPHONES',
          },
          {
            id: 13,
            name: 'COMPUTING',
          },
        ],
      }),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('paginate', () => {
    it('should return a list of categories', async () => {
      const options: IPaginationOptions = { page: 1, limit: 10 };
      expect(await service.paginate(options)).toEqual(list);
    });
  });

  describe('findOneById', () => {
    it('should return a category', async () => {
      expect(await service.findOneById(1)).toEqual({
        id: 1,
        name: 'TECHNOLOGY',
        subCategories: [
          {
            id: 12,
            name: 'CELL PHONES AND TELEPHONES',
          },
          {
            id: 13,
            name: 'COMPUTING',
          },
        ],
      });
    });
    it('should return a not found exception', async () => {
      mockCategoryRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.findOneById(10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Category with id 10 not found.');
      }
    });
  });
});
