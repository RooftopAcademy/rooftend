import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Platform } from '../entities/platform.entity';
import { PlatformService } from './platform.service';

describe('PlatformService', () => {
  let service: PlatformService;

  const mockPlatformRepository = {
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 6,
          createdAt: '2021-11-30T12:09:40.600Z',
          updatedAt: '2021-11-30T12:10:38.845Z',
          deletedAt: null,
          countryCode: 'ARG',
          currencyCode: 'ARS',
          langCode: 'es_AR',
          phoneCountryCode: '+549 ',
        },
        {
          id: 10,
          createdAt: '2021-12-01T13:35:56.457Z',
          updatedAt: '2021-12-01T13:35:56.457Z',
          deletedAt: null,
          countryCode: 'URY',
          currencyCode: 'UYU',
          langCode: 'es_UY',
          phoneCountryCode: '+598 ',
        },
      ]),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatformService,
        {
          provide: getRepositoryToken(Platform),
          useValue: mockPlatformRepository,
        },
      ],
    }).compile();

    service = module.get<PlatformService>(PlatformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of platforms', async () => {
      expect(await service.findAll()).toEqual([
        {
          id: 6,
          createdAt: '2021-11-30T12:09:40.600Z',
          updatedAt: '2021-11-30T12:10:38.845Z',
          deletedAt: null,
          countryCode: 'ARG',
          currencyCode: 'ARS',
          langCode: 'es_AR',
          phoneCountryCode: '+549 ',
        },
        {
          id: 10,
          createdAt: '2021-12-01T13:35:56.457Z',
          updatedAt: '2021-12-01T13:35:56.457Z',
          deletedAt: null,
          countryCode: 'URY',
          currencyCode: 'UYU',
          langCode: 'es_UY',
          phoneCountryCode: '+598 ',
        },
      ]);
    });
  });
});
