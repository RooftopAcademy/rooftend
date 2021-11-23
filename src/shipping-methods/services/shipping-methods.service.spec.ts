import { Test, TestingModule } from '@nestjs/testing';
import { ShippingMethodsService } from './shipping-methods.service';

describe('ShippingMethodsService', () => {
  let service: ShippingMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingMethodsService],
    }).compile();

    service = module.get<ShippingMethodsService>(ShippingMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
