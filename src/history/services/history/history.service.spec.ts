import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { History } from '../../models/history.entity';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  let user = {
    id: 1,
    user_id: 1,
    createAt: Date.now(),
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

  describe('findAll', () => {
    it('should return a list of history', async () => {
      expect(await service.getAll(user))
    });
  })
});
