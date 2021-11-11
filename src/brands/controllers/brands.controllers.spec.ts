import { Test, TestingModule } from '@nestjs/testing';
import { brandsController } from './brands.controllers';

describe('StoresController', () => {
  let controller: brandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [brandsController],
    }).compile();

    controller = module.get<brandsController>(brandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});