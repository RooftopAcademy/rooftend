import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from '../services/brands.serveces';
import { BrandsController } from './brands.controllers';

describe('brandsController', () => {
  let controller: BrandsController;

  const mockBrandService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers:[BrandsService]
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
    expect(controller.create())
  });
});