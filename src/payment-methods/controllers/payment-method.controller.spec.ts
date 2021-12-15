import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import PaymentMethodsService from '../services/payment-method.service';
import PaymentMethodsController from './payment-method.controller';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  const mockPaymentMethodsService = {
    all: jest.fn().mockImplementation(() => {
      return [
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
      ];
    }),
    find: jest.fn().mockImplementation((id) => {
      return {
        id,
        name: 'CASH',
        type: 'Cash',
        created_at: '2021-12-12T13:45:40.800Z',
        updated_at: '2021-12-12T15:14:54.100Z',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsController],
      providers: [PaymentMethodsService],
    })
      .overrideProvider(PaymentMethodsService)
      .useValue(mockPaymentMethodsService)
      .compile();

    controller = module.get<PaymentMethodsController>(PaymentMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('all', () => {
    it('should return a list of payment methods', async () => {
      expect(await controller.all()).toEqual([
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

      expect(mockPaymentMethodsService.all).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return the payment method found by id', async () => {
      expect(await controller.find(2)).toEqual({
        id: 2,
        name: 'CASH',
        type: 'Cash',
        created_at: '2021-12-12T13:45:40.800Z',
        updated_at: '2021-12-12T15:14:54.100Z',
      });
    });

    it('should call service.find with the id provided', () => {
      expect(mockPaymentMethodsService.find).toHaveBeenCalledWith(2);
    });

    it('should return Payment method not found when there is not match with id', async () => {
      mockPaymentMethodsService.find.mockReturnValueOnce(null);

      try {
        expect(await controller.find(2)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Payment method not found');
      }
    });
  });
});
