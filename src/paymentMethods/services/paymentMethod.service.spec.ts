import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import PaymentMethod from '../paymentMethod.entity';
import PaymentMethodsService from './paymentMethod.service';

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  let mockPaymentMethodRepo = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodsService, {
        provide: getRepositoryToken(PaymentMethod),
        useValue: mockPaymentMethodRepo
      }],
    }).compile();

    service = module.get<PaymentMethodsService>(PaymentMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
