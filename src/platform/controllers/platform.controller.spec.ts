import { Test, TestingModule } from '@nestjs/testing';
import { PlatformController } from '../controllers/platform.controller';
import { CreatePlatformDTO } from '../entities/create-platform-dto.entity';
import { UpdatePlatformDTO } from '../entities/update-platform-dto.entity';
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
    findOneById: jest.fn().mockImplementation((id) => {
      return {
        id,
        createdAt: '2021-11-30T12:09:40.600Z',
        updatedAt: '2021-11-30T12:10:38.845Z',
        countryCode: 'ARG',
        currencyCode: 'ARS',
        langCode: 'es_AR',
        phoneCountryCode: '+549 ',
      };
    }),
    create: jest.fn().mockImplementation((dto: CreatePlatformDTO) => {
      return { message: 'Platform Created' };
    }),
    update: jest.fn().mockImplementation((id, dto: UpdatePlatformDTO) => {
      return { message: 'Task Updated' };
    }),
    remove: jest.fn().mockImplementation((id) => {
      return { message: 'Task Removed' };
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

  describe('findOne', () => {
    it('should return a platforms by its id', () => {
      expect(controller.findOne(10)).toEqual({
        id: 10,
        createdAt: '2021-11-30T12:09:40.600Z',
        updatedAt: '2021-11-30T12:10:38.845Z',
        countryCode: 'ARG',
        currencyCode: 'ARS',
        langCode: 'es_AR',
        phoneCountryCode: '+549 ',
      });

      expect(mockPlatformService.findOneById).toHaveBeenCalled();

      expect(mockPlatformService.findOneById).toHaveBeenCalledWith(10);
    });
  });

  describe('create', () => {
    it('should create a new platform', () => {
      const dto: CreatePlatformDTO = {
        countryCode: 'ARG',
        currencyCode: 'ARS',
        langCode: 'es_AR',
        phoneCountryCode: '+549 ',
      };

      expect(controller.create(dto)).toEqual({ message: 'Platform Created' });

      expect(mockPlatformService.create).toHaveBeenCalled();

      expect(mockPlatformService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update platform', () => {
      const dto: UpdatePlatformDTO = {
        updatedAt: null,
        countryCode: 'ARG',
        currencyCode: 'ARS',
        langCode: 'es_AR',
        phoneCountryCode: '+549 ',
      };

      expect(controller.update(10, dto)).toEqual({ message: 'Task Updated' });

      expect(mockPlatformService.update).toHaveBeenCalled();

      expect(mockPlatformService.update).toHaveBeenCalledWith(10, dto);
    });
  });

  describe('remove', () => {
    it('should remove platform', () => {
      expect(controller.remove(10)).toEqual({ message: 'Task Removed' });

      expect(mockPlatformService.remove).toHaveBeenCalled();

      expect(mockPlatformService.remove).toHaveBeenCalledWith(10);
    });
  });
});
