import { Test, TestingModule } from '@nestjs/testing';
import PaymentMethodsService from '../services/paymentMethod.service';
import PaymentMethodsController from './paymentMethod.controller';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  const mockPaymentMethodsService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsController],
      providers: [PaymentMethodsService]
    })
      .overrideProvider(PaymentMethodsService)
      .useValue(mockPaymentMethodsService)
      .compile();

    controller = module.get<PaymentMethodsController>(PaymentMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment method', () => {
    const dto = {name: 'Cash', type: 'CASH'};
    expect(controller.create(dto))
    .toEqual({
      id: expect.any(Number),
      name: 'Cash',
      type: 'CASH'
    })
  
  expect(mockPaymentMethodsService.create).toHaveBeenCalledWith(dto);

  })

});
