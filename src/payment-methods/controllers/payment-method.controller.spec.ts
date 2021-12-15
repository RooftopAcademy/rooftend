import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import PaymentMethodsService from '../services/payment-method.service';
import PaymentMethodsController from './payment-method.controller';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  const mockPaymentMethodsService = {
    getAll: jest.fn().mockImplementation(() => {
      return [
        {
          name: 'CASH',
          type: 'Cash',
        },
        {
          name: 'DEBIT_CARD',
          type: 'Debit Card',
        },
      ];
    }),
    findOne: jest.fn().mockImplementation(() => {
      return {
        name: 'CASH',
        type: 'Cash',
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
      expect(await controller.getAll()).toEqual([
        {
          name: 'CASH',
          type: 'Cash',
        },
        {
          name: 'DEBIT_CARD',
          type: 'Debit Card',
        },
      ]);

      expect(mockPaymentMethodsService.getAll).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return the payment method found by id', async () => {
      expect(await controller.findOne(2)).toEqual({
        name: 'CASH',
        type: 'Cash',
      });
    });

    it('should call service.find with the id provided', () => {
      expect(mockPaymentMethodsService.findOne).toHaveBeenCalledWith(2);
    });

    it('should return Payment method not found when there is not match with id', async () => {
      mockPaymentMethodsService.findOne.mockReturnValueOnce(null);

      try {
        expect(await controller.findOne(2)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Payment method not found');
      }
    });
  });
});
