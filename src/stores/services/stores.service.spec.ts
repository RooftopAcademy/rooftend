const itemList = [
  {
    id: '1',
    brand: {
      id: '1',
      name: 'Asus',
      photoUrl: 'http://dummyimage.com/100x100.png/dddddd/000000',
    },
  },
  {
    id: '2',
    brand: {
      id: '5',
      name: 'Xioami',
      photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
    },
  },
];
const list = {
  items: itemList.slice(0, 2),
  meta: {
    totalItems: '2',
    itemCount: '2',
    itemsPerPage: '10',
    totalPages: '1',
    currentPage: '1',
  },
};
jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue(list),
}));
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Store } from '../entities/stores.entity';
import { StoresService } from './stores.service';

describe('StoresService', () => {
  let service: StoresService;
  const mockStoreRepository = {
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        brand: {
          id: '5',
          name: 'Xioami',
          photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        },
      }),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
        {
          provide: getRepositoryToken(Store),
          useValue: mockStoreRepository,
        },
      ],
    }).compile();

    service = module.get<StoresService>(StoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('paginate', () => {
    it('should return a list of stores', async () => {
      const options: IPaginationOptions = { page: 1, limit: 10 };
      expect(await service.paginate(options)).toEqual(list);
    });
  });

  describe('getOne', () => {
    it('should return a store', async () => {
      expect(await service.getOne(2)).toEqual({
        id: 2,
        brand: {
          id: '5',
          name: 'Xioami',
          photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        },
      });
    });
  });

  it('should return a not found exception', async () => {
    mockStoreRepository.findOne.mockReturnValueOnce(null);

    try {
      expect(await service.getOne(2)).toThrow(NotFoundException);
    } catch (err) {
      expect(err.message).toBe('Store with id 2 not found');
    }
  });
});
