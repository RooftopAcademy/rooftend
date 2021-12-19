import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import PaymentMethod from '../models/payment-method.entity';
import PaymentMethodsService from './payment-method.service';

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  const mockPaymentMethodRepo = {
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          name: 'CASH',
          type: 'Cash',
        },
        {
          name: 'DEBIT_CARD',
          type: 'Debit Card',
        },
      ]),
    ),
    findOne: jest.fn().mockImplementation(() =>
      Promise.resolve({
        name: 'CASH',
        type: 'Cash',
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentMethodsService,
        {
          provide: getRepositoryToken(PaymentMethod),
          useValue: mockPaymentMethodRepo,
        },
      ],
    }).compile();

    service = module.get<PaymentMethodsService>(PaymentMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('all', () => {
    it('should return a list of payment methods', async () => {
      expect(await service.getAll()).toEqual([
        {
          name: 'CASH',
          type: 'Cash',
        },
        {
          name: 'DEBIT_CARD',
          type: 'Debit Card',
        },
      ]);
    });
  });

  describe('find', () => {
    it('should return the payment method found by id', async () => {
      expect(await service.findOne(1)).toEqual({
        name: 'CASH',
        type: 'Cash',
      });
    });

    it('should call repository.find with the id provided', async () => {
      await service.findOne(4);

      expect(mockPaymentMethodRepo.findOne).toHaveBeenCalledWith(4);
    });
  });
});
