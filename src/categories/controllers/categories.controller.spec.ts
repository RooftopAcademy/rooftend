import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../services/categories.service';
import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  const mockCategoriesService = {
    paginate: jest.fn().mockImplementation(() => {
      return [
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
      ];
    }),

    findOneById: jest.fn().mockImplementation((id) => {
      return {
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
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('paginate', () => {
    it('should return a list of categories', () => {
      expect(controller.index()).toEqual([
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
  describe('findOne', () => {
    it('should return a category by its id', () => {
      expect(controller.findOne(1)).toEqual({
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
      expect(mockCategoriesService.findOneById).toHaveBeenCalled();
      expect(mockCategoriesService.findOneById).toHaveBeenCalledWith(1);
    });
  });
});
