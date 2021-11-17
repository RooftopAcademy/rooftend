import { Test, TestingModule } from '@nestjs/testing';
import { ShippingMethodsController } from './shipping-methods.controller';

describe('ShippingMethodsController', () => {
  let controller: ShippingMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingMethodsController],
    }).compile();

    controller = module.get<ShippingMethodsController>(ShippingMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
