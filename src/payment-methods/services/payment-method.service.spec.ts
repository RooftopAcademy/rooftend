import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import PaymentMethod from '../models/payment-method.entity';
import PaymentMethodsService from './payment-method.service';

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  let mockPaymentMethodRepo = {
    find: jest.fn().mockImplementation(() => 
      Promise.resolve([
        {
          id: 2,
          name: 'CASH',
          type: 'Cash',
          created_at: '2021-12-12T13:45:40.800Z',
          updated_at: '2021-12-12T15:14:54.100Z',
        },
        {
          id: 3,
          name: 'DEBIT_CARD',
          type: 'Debit Card',
          created_at: '2021-12-12T15:13:35.600Z',
          updated_at: '2021-12-13T11:45:33.500Z',
        },
      ])
    ),
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        name: 'CASH',
        type: 'Cash',
        created_at: '2021-12-12T13:45:40.800Z',
        updated_at: '2021-12-12T15:14:54.100Z',
      })
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
      expect(await service.all()).toEqual([
        {
          id: 2,
          name: 'CASH',
          type: 'Cash',
          created_at: '2021-12-12T13:45:40.800Z',
          updated_at: '2021-12-12T15:14:54.100Z',
        },
        {
          id: 3,
          name: 'DEBIT_CARD',
          type: 'Debit Card',
          created_at: '2021-12-12T15:13:35.600Z',
          updated_at: '2021-12-13T11:45:33.500Z',
        }, 
      ]);
    });
  });
  
  describe('find', () => {
    it('should return the payment method found by id', async () => {
      expect(await service.find(1)).toEqual({
        id: 1,
        name: 'CASH',
        type: 'Cash',
        created_at: '2021-12-12T13:45:40.800Z',
        updated_at: '2021-12-12T15:14:54.100Z',
      });
    });

    it('should call repository.find with the id provided', async () => {
      
      await service.find(4);

      expect(mockPaymentMethodRepo.findOne).toHaveBeenCalledWith(4); 
    });

  });

});
