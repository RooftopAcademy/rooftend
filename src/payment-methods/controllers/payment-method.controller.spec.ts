import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import PaymentMethodsService from '../services/payment-method.service';
import PaymentMethodsController from './payment-method.controller';

describe('PaymentMethodsController', () => {
  let controller: PaymentMethodsController;

  const mockPaymentMethodsService = {
    all: jest.fn().mockImplementation(() => {
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
    find: jest.fn().mockImplementation((id) => {
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
      expect(await controller.all()).toEqual([
        {
          name: 'CASH',
          type: 'Cash',
        },
        {
          name: 'DEBIT_CARD',
          type: 'Debit Card',
        },
      ]);
  
      expect(mockPaymentMethodsService.all).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return the payment method found by id', async () => {
      expect(await controller.find(2)).toEqual({
        name: 'CASH',
        type: 'Cash',
      });
    })

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
    })    
  });
});
