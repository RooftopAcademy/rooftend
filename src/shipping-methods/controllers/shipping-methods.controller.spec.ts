import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ShippingMethodsService } from '../services/shipping-methods.service';
import { ShippingMethodsController } from './shipping-methods.controller';

describe('ShippingMethodsController', () => {
  let controller: ShippingMethodsController;
  const mockShippingMethodsService = {
    findAll: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 3,
          name: 'Titulo',
          photoId: 2,
        },
        {
          id: 2,
          name: 'Name',
          photoId: 1,
        }
      ]),
    ),
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        name: 'Name',
        photoId: 1,
      }),
    ),
    getCount: jest.fn().mockImplementation(() => Promise.resolve(10)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingMethodsController],
      providers: [ShippingMethodsService],
    })
      .overrideProvider(ShippingMethodsService)
      .useValue(mockShippingMethodsService)
      .compile();

    controller = module.get<ShippingMethodsController>(
      ShippingMethodsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('all', () => {
    it('should return an array of Shipping Methods', async () => {
      expect(await controller.getAll()).toEqual(
        expect.arrayContaining([
          {
            id: 3,
            name: 'Titulo',
            photoId: 2,
          },
          {
            id: 2,
            name: 'Name',
            photoId: 1,
          }
        ]),
      );
    });

    it('should call service.findAll with the id provided', () => {
      expect(mockShippingMethodsService.findAll).toHaveBeenCalled();
    });
  });

  describe('one', () => {
    const id = 1;
    it('should return a Shipping Method with the given id', async () => {
      expect(await controller.getOne(id)).toEqual({
        id,
        name: 'Name',
        photoId: 1,
      });
    });

    it('should call service.findOne with the id provided', () => {
      expect(mockShippingMethodsService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('count', () => {
    it('should return the quantity of existing Shipping Methods', async () => {
      expect(await controller.getCount()).toEqual(10);
    });

    it('should call service.getCount with the id provided', () => {
      expect(mockShippingMethodsService.getCount).toHaveBeenCalled();
    });
  });
});
