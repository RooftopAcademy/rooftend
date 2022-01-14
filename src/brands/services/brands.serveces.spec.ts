const brandsList = [
  {
    id: 1,
    name: 'nike',
    photoUrl:
      'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
  },
  {
    id: 2,
    name: 'adidas',
    photoUrl:
      'https://logos-marcas.com/wp-content/uploads/2020/04/Adidas-Logo.png',
  },
];
const list = {
  items: brandsList.slice(0, 2),
  meta: {
    totalItems: 2,
    itemCount: 2,
    itemPerPage: 10,
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
import { Brand } from '../entities/brands.entity';
import { BrandsService } from './brands.serveces';

describe('BrandsService', () => {
  let service: BrandsService;

  const mockBrandsRepository = {
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        name: 'nike',
        photoUrl:
          'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useValue: mockBrandsRepository,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('paginate', () => {
    it('should return a list of brands', async () => {
      const options: IPaginationOptions = { page: 1, limit: 10 };
      expect(await service.paginate(options)).toEqual(list);
    });
  });

  describe('findOne', () => {
    it('should return a brand', async () => {
      expect(await service.findOne(1)).toEqual({
        id: 1,
        name: 'nike',
        photoUrl:
          'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
      });
    });
    it('should return a not found exception', async () => {
      mockBrandsRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.findOne(10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Brand with id 10 not found.');
      }
    });
  });
});
