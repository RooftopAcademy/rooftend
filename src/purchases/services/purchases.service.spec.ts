import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { PurchasesService } from './purchases.service';

describe('PurchasesService', () => {
  let service: PurchasesService;

  const mockPurchasesRepository = {
    find: jest.fn().mockImplementation((id) =>
      Promise.resolve([
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
      ]),
    ),
    findOne: jest.fn().mockImplementation((id, userId) =>
      Promise.resolve({
        title: 'shirt',
        quantity: 5,
        price: 25.75,
        photo: 'www.photodelivery.com/fancyShirt',
      }),
    ),
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      setParameter: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockImplementation(() => {
        return Promise.resolve([
          {
            purchasedAt: '2021-12-13T03:00:00.000Z',
            title: 'shirt',
            quantity: 5,
            price: 25.75,
            photo: 'www.photodelivery.com/fancyShirt',
            deliveryStatus: 'PENDING',
          },
          {
            purchasedAt: '2021-12-13T03:00:00.000Z',
            title: 'shoes',
            quantity: 2,
            price: 75.76,
            photo: 'www.photodelivery.com/fancyShoes',
            deliveryStatus: 'PENDING',
          },
        ]);
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: getRepositoryToken(Cart),
          useValue: mockPurchasesRepository,
        },
      ],
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of purchases (purchased carts)', async () => {
      expect(await service.findAll(1)).toEqual([
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
      ]);
    });
  });

  describe('findOneById', () => {
    it('createQueryBuilder should be called', async () => {
      const createQueryBuilder = jest.spyOn(
        mockPurchasesRepository,
        'createQueryBuilder',
      );
      await service.findOneById(1, 2);
      expect(createQueryBuilder).toHaveBeenCalled();
    });

    it('getRawMany should be called', async () => {
      const getRawMany = jest.spyOn(
        mockPurchasesRepository.createQueryBuilder(),
        'getRawMany',
      );
      await service.findOneById(1, 2);
      expect(getRawMany).toHaveBeenCalled();
    });

    it('should return a purchase-details by its cart id', async () => {
      expect(await service.findOneById(1, 2)).toEqual({
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
    });

    it('should return a not found exception', async () => {
      mockPurchasesRepository.findOne.mockReturnValueOnce(null);

      try {
        expect(await service.findOneById(10, 1)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Purchase not found');
      }
    });

    it('should return a forbidden exception', async () => {
      mockPurchasesRepository.findOne.mockReturnValueOnce({
        purchasedAt: null,
        title: 'shirt',
        quantity: 5,
        price: 25.75,
        photo: 'www.photodelivery.com/fancyShirt',
      });

      try {
        expect(await service.findOneById(10, 1)).toThrow(ForbiddenException);
      } catch (err) {
        expect(err.message).toBe('This cart has not been purchased');
      }
    });
  });
});
