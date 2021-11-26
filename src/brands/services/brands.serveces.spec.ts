import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from '../entities/brands.entity';
import { BrandsService } from './brands.serveces';

describe('BrandsService', () => {
  let service: BrandsService;

  const mockBrandsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((brand) => Promise.resolve({ id: 2, ...brand })),
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

  it('should create a new brand record and return that', async () => {
    expect(await service.create({ name: 'Mario', photoId: 'ph id' })).toEqual({
      id: expect.any(Number),
      name: 'Mario',
      photoId: 'ph id',
    });
  });
});
