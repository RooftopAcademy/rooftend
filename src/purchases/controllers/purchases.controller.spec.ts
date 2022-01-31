import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesService } from '../services/purchases.service';
import { PurchasesController } from './purchases.controller';

describe('PurchasesController', () => {
  let controller: PurchasesController;

  const mockPurchasesService = {
    findAll: jest.fn().mockImplementation((userId) => {
      return [
        {
          id: 2,
          purchasedAt: '2021-12-13T03:00:00.000Z',
          amount: 12,
          currencyCode: 'ARS',
        },
      ];
    }),
    findOneById: jest.fn().mockImplementation((id, userId) => {
      return {
        purchasedAt: '2021-12-13T03:00:00.000Z',
        deliveryStatus: 'PENDING',
        itemDetails: [
          {
            title: 'shirt',
            quantity: 5,
            price: 25.75,
            photo: 'www.photodelivery.com/fancyShirt',
          },
          {
            title: 'shoes',
            quantity: 2,
            price: 75.76,
            photo: 'www.photodelivery.com/fancyShoes',
          },
        ],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesController],
      providers: [PurchasesService],
    })
      .overrideProvider(PurchasesService)
      .useValue(mockPurchasesService)
      .compile();

    controller = module.get<PurchasesController>(PurchasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of purchases (purchased carts)', () => {
      /* expect(controller.findAll()).toEqual([
        {
          id: 2,
          purchasedAt: '2021-12-13T03:00:00.000Z',
          amount: 12,
          currencyCode: 'ARS',
        },
      ]); */

      expect(mockPurchasesService.findAll).toHaveBeenCalled();

      expect(mockPurchasesService.findAll).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('should return a purchase-details by its cart id', () => {
      expect(controller.findOne(10)).toEqual({
        purchasedAt: '2021-12-13T03:00:00.000Z',
        deliveryStatus: 'PENDING',
        itemDetails: [
          {
            title: 'shirt',
            quantity: 5,
            price: 25.75,
            photo: 'www.photodelivery.com/fancyShirt',
          },
          {
            title: 'shoes',
            quantity: 2,
            price: 75.76,
            photo: 'www.photodelivery.com/fancyShoes',
          },
        ],
      });

      expect(mockPurchasesService.findOneById).toHaveBeenCalled();

      expect(mockPurchasesService.findOneById).toHaveBeenCalledWith(10, 1);
    });
  });
});
