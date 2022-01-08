import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShippingMethod } from '../entities/shipping-method.entity';
import { ShippingMethodsService } from './shipping-methods.service';

describe('ShippingMethodsService', () => {
  let service: ShippingMethodsService;

  const id = 1;
  const mockShippingMethodsRepository = {
    findAll: jest.fn().mockImplementation(() =>
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
    getCount: jest.fn().mockImplementation(() => Promise.resolve(1)),
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
          id: expect.any(Number),
          name: expect.any(String),
          photoId: expect.any(Number),
        },
      ]),
    );
  });

  it('should return a Shipping Method with the given id', async () => {
    expect(await service.findOne(id)).toEqual({
      id,
      name: expect.any(String),
      photoId: expect.any(Number),
    });
  });

  it('should return the quantity of existing Shipping Methods', async () => {
    expect(await service.getCount()).toEqual(expect.any(Number));
  });
});
