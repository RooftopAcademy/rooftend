import { Test, TestingModule } from '@nestjs/testing';
import { PlatformController } from '../controllers/platform.controller';
import { PlatformService } from '../services/platform.service';

describe('PlatformController', () => {
  let controller: PlatformController;

  const mockPlatformService = {
    findAll: jest.fn().mockImplementation(() => {
      return [
        {
          id: 6,
          createdAt: '2021-11-30T12:09:40.600Z',
          updatedAt: '2021-11-30T12:10:38.845Z',
          countryCode: 'ARG',
          currencyCode: 'ARS',
          langCode: 'es_AR',
          phoneCountryCode: '+549 ',
        },
        {
          id: 10,
          createdAt: '2021-12-01T13:35:56.457Z',
          updatedAt: '2021-12-01T13:35:56.457Z',
          countryCode: 'URY',
          currencyCode: 'UYU',
          langCode: 'es_UY',
          phoneCountryCode: '+598 ',
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformController],
      providers: [PlatformService],
    })
      .overrideProvider(PlatformService)
      .useValue(mockPlatformService)
      .compile();

    controller = module.get<PlatformController>(PlatformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of platforms', () => {
      expect(controller.findAll()).toEqual([
        {
          id: 6,
          createdAt: '2021-11-30T12:09:40.600Z',
          updatedAt: '2021-11-30T12:10:38.845Z',
          countryCode: 'ARG',
          currencyCode: 'ARS',
          langCode: 'es_AR',
          phoneCountryCode: '+549 ',
        },
        {
          id: 10,
          createdAt: '2021-12-01T13:35:56.457Z',
          updatedAt: '2021-12-01T13:35:56.457Z',
          countryCode: 'URY',
          currencyCode: 'UYU',
          langCode: 'es_UY',
          phoneCountryCode: '+598 ',
        },
      ]);

      expect(mockPlatformService.findAll).toHaveBeenCalled();

      expect(mockPlatformService.findAll).toHaveBeenCalledWith();
    });
  });
});
