import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Offer, PromotionType } from '../entities/offer.entity';
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

  it('should find an offer with the given id and return it', async () => {
    expect(await service.getOffer(10)).toEqual({
        id: 10,
        createdAt: expect.any(Number),
        item: expect.any(Number),
        startAt: expect.any(Number),
        endAt: expect.any(Number),
        discount: expect.any(Number),
        intialStock: expect.any(Number),
        soldStock: expect.any(Number),
        finalPrice: expect.any(Number),
        promotionType: "LIGHTNING_DEAL",
    })
});
});
