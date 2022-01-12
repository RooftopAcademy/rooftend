import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Offer } from '../entities/offer.entity';
import { OffersService } from './offers.service';

describe('OffersService', () => {
  let service: OffersService;
  const mockOffersRepository = {
    findOne: jest.fn().mockImplementation((id) => Promise.resolve({ 
      id, 
      createdAt: Date.now(),
      item: Date.now(),
      startAt: Date.now(),
      endAt: Date.now(),
      discount: Date.now(),
      intialStock: Date.now(),
      soldStock: Date.now(),
      finalPrice: Date.now(),
      promotionType: "LIGHTNING_DEAL",
    })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffersService,{
        provide: getRepositoryToken(Offer),
        useValue: mockOffersRepository
      }],
    }).compile();

    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
