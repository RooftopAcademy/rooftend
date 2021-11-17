import { Test, TestingModule } from '@nestjs/testing';
import PaymentMethodsService from '../services/paymentMethod.service';
import PaymentMethodsController from './paymentMethod.controller';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  const PaymentMethodsUserService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsController],
      providers: [PaymentMethodsService]
    })
      .overrideProvider(PaymentMethodsService)
      .useValue(PaymentMethodsUserService)
      .compile();

    controller = module.get<PaymentMethodsController>(PaymentMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
