import { Test, TestingModule } from '@nestjs/testing';
import { Brand } from '../entities/brands.entity';
import { createBrandDTO } from '../entities/create-brands-dto.entity';
import { BrandsService } from '../services/brands.serveces';
import { BrandsController } from './brands.controllers';

describe('brandsController', () => {
  let controller: BrandsController;

  const mockBrandService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),

    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [BrandsService],
    })
      .overrideProvider(BrandsService)
      .useValue(mockBrandService)
      .compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a brand', () => {
    expect(controller.create({ id:1, name: 'Mario', photoId: 123 })).toEqual({
      id: expect.any(Number),
      name: 'Mario',
      photoId: 123,
    });
  });

  it('should update a brand', () => {
    const dto: createBrandDTO = { id: 1, name: 'Mario', photoId: 123 };
    expect(controller.update(1, dto)).toEqual({
      id: expect.any(Number),
      name: 'Mario',
      photoId: 123,
    });
  });
});
