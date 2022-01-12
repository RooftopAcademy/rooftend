const itemsList = [{ id: 1, user_id: 1, createdAt: Date.now() }];

  jest.mock('nestjs-typeorm-paginate', () => ({
    paginate: jest.fn().mockResolvedValue({
      items: itemsList.slice(0, 2),
      meta: {
        itemCount: 2,
        totalItems: 2,
        totalPages: 1,
        currentPage: 1,
      },
    }),
  }));

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { History } from '../models/history.entity';
import { HistoryService } from './history.service'; 
import { User } from '../../users/entities/user.entity';

describe('HistoryService', () => {
  let service: HistoryService;

  let user = {
    id: 1,
    user_id: 1,
    createAt: Date.now(),
  };

  let history = {
    id: 1,
    user_id: user.id,
    createdAt: Date.now(),
  };

  const mockHistoryRepository = {
    find: jest.fn(() => Promise.resolve([
      {
        id: 1,
        user_id: 1,
        createdAt: new Date(),
      },
    ]),
    ),
    delete: jest.fn(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getRepositoryToken(History),
          useValue: mockHistoryRepository,
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete', () => {
    it('should delete am History', async () => {
      expect(await service.delete(history.id)).toEqual(true);
    });
  });

  describe('paginate', () => {
    it('should return an history pagination', async () => {
      const options: IPaginationOptions = { page: 1, limit: 10 };

      jest.mock('nestjs-typeorm-paginate', () => ({
        paginate: jest.fn().mockResolvedValue({
            items: itemsList.slice(0, 2),
            meta: {
              itemCount: 2,
              totalItems: 2,
              totalPages: 1,
              currentPage: 1,
            }
          }),
      }));

      expect((await service.paginate(options, new User)).items.length).toBe(itemsList.length);
    })
  })
});
