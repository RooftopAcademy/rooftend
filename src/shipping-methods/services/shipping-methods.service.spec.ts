import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShippingMethod } from '../entities/shipping-method.entity';
import { ShippingMethodsService } from './shipping-methods.service';

describe('ShippingMethodsService', () => {
  let service: ShippingMethodsService;

  const id = 1;
  const mockShippingMethodsRepository = {
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 3,
          name: 'Name',
          photoId: 1,
        },
      ]),
    ),
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        name: 'Name',
        photoId: 1,
      }),
    ),
    count: jest.fn().mockImplementation(() => Promise.resolve(10)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShippingMethodsService,
        {
          provide: getRepositoryToken(ShippingMethod),
          useValue: mockShippingMethodsRepository,
        },
      ],
    }).compile();

    service = module.get<ShippingMethodsService>(ShippingMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of Shipping Methods', async () => {
    expect(await service.findAll()).toEqual(
      expect.arrayContaining([
        {
          id: 3,
          name: 'Name',
          photoId: 1,
        },
      ]),
    );
  });

  it('should return a Shipping Method with the given id', async () => {
    expect(await service.findOne(id)).toEqual({
      id,
      name: 'Name',
      photoId: 1,
    });
  });

  it('should return the quantity of existing Shipping Methods', async () => {
    expect(await service.getCount()).toEqual(10);
  });
});
