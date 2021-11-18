import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import PaymentMethod from '../paymentmethod.entity';
import PaymentMethodsService from './paymentmethod.service';

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  let mockPaymentMethodRepo = {
    create: jest.fn(dto => dto),
    save: jest.fn(paymentMethod => Promise.resolve({
      id: Date.now(),
      ...paymentMethod
    }))
  }

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

  it('should create a new payment method record and return that', async () => {
    const dto = {name: 'Cash', type: 'CASH'};
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto
    })
  })

});
