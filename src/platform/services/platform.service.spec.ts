import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePlatformDTO } from '../entities/create-platform-dto.entity';
import { Platform } from '../entities/platform.entity';
import { UpdatePlatformDTO } from '../entities/update-platform-dto.entity';
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
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        createdAt: '2021-12-01T13:35:56.457Z',
        updatedAt: '2021-12-01T13:35:56.457Z',
        deletedAt: null,
        countryCode: 'URY',
        currencyCode: 'UYU',
        langCode: 'es_UY',
        phoneCountryCode: '+598 ',
      }),
    ),
    create: jest
      .fn()
      .mockImplementation((platform: CreatePlatformDTO) => platform),
    save: jest.fn().mockImplementation((platform: Platform) =>
      Promise.resolve({
        id: Date.now(),
        ...platform,
      }),
    ),
    update: jest.fn().mockImplementation((id, platform: Platform) =>
      Promise.resolve({
        id,
        updatedAt: Date.now(),
        ...platform,
      }),
    ),
    softDelete: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
      }),
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

  describe('findOneById', () => {
    it('should return a platform', async () => {
      expect(await service.findOneById(6)).toEqual({
        id: 6,
        createdAt: '2021-12-01T13:35:56.457Z',
        updatedAt: '2021-12-01T13:35:56.457Z',
        deletedAt: null,
        countryCode: 'URY',
        currencyCode: 'UYU',
        langCode: 'es_UY',
        phoneCountryCode: '+598 ',
      });
    });

    it('should return a not found exception', async () => {
      mockPlatformRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.findOneById(10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Platform not found');
      }
    });
  });

  describe('create', () => {
    it('should create a new platform', async () => {
      const dto: CreatePlatformDTO = {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        langCode: 'pt_BR',
        phoneCountryCode: '+559 ',
      };

      mockPlatformRepository.findOne.mockReturnValueOnce(null);

      expect(await service.create(dto)).toEqual({
        message: 'Platform Created',
      });
    });

    it('should return a conflict exception', async () => {
      const dto: CreatePlatformDTO = {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        langCode: 'pt_BR',
        phoneCountryCode: '+559 ',
      };

      try {
        expect(await service.create(dto)).toThrow(ConflictException);
      } catch (err) {
        expect(err.message).toBe('The platform already exists');
      }
    });
  });

  describe('update', () => {
    it('should update a platform', async () => {
      const dto: UpdatePlatformDTO = {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        langCode: 'pt_BR',
        phoneCountryCode: '+559 ',
      };

      mockPlatformRepository.findOne.mockReturnValueOnce((id) => {
        return {
          id,
          createdAt: '2021-12-01T13:35:56.457Z',
          updatedAt: '2021-12-01T13:35:56.457Z',
          deletedAt: null,
          countryCode: 'URY',
          currencyCode: 'UYU',
          langCode: 'es_UY',
          phoneCountryCode: '+598 ',
        };
      });

      mockPlatformRepository.findOne.mockReturnValueOnce(null);

      expect(await service.update(10, dto)).toEqual({
        message: 'Platform Updated',
      });
    });

    it('should return a conflict exception', async () => {
      const dto: UpdatePlatformDTO = {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        langCode: 'pt_BR',
        phoneCountryCode: '+559 ',
      };

      try {
        expect(await service.update(10, dto)).toThrow(ConflictException);
      } catch (err) {
        expect(err.message).toBe(
          'This modification will produce two platforms with the same attributes',
        );
      }
    });

    it('should return a not found exception', async () => {
      const dto: UpdatePlatformDTO = {
        countryCode: 'BRA',
        currencyCode: 'BRL',
        langCode: 'pt_BR',
        phoneCountryCode: '+559 ',
      };

      mockPlatformRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.update(10, dto)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Platform not found');
      }
    });
  });

  describe('remove', () => {
    it('should soft delete a platform', async () => {
      expect(await service.remove(10)).toEqual({
        message: 'Platform Deleted',
      });
    });

    it('should return a not found exception', async () => {
      mockPlatformRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.remove(10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Platform not found');
      }
    });
  });
});
