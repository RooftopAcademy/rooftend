import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../entities/categories.entity';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const mockCategoryRepository = {
    paginate: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          items: [
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
          ],
        },
      ]),
    ),
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
      expect(await service.paginate({ limit: 2, page: 1 })).toEqual([
        {
          items: [
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
          ],
        },
      ]);
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
