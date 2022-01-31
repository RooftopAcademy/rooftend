import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { CaslModule } from '../../auth/casl/casl.module';
import { User } from '../../users/entities/user.entity';
import { Address } from '../entities/address.entity';
import { AddressesService } from '../services/addresses.service';
import { AddressesController } from './addresses.controller';

describe('AddressController', () => {
  let controller: AddressesController;

  const mockUser = new User();
  mockUser.id = 1;

  const address = plainToClass(Address, {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    countryCode: 'sasa',
    countryState: 'sas',
    cityName: 'sasa',
    streetName: 'sasa',
    streetNumber: 198,
    zipCode: 'sasa',
    floor: 232,
    office: 'dsdsa',
    references: 'dsds',
    subjectId: 983,
    subjectType: 'sdsa',
    user: mockUser,
  });

  const mockAddressService = {
    findAll: jest.fn(),
    /* findOne: jest.fn().mockImplementation(() => {
      const user = new User();
      user.id = 1;

      const address: Address = new Address();
      address.user = user;

      return Promise.resolve(address);
    }), */
    findOne: jest.fn().mockResolvedValue(address),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService],
      imports: [CaslModule],
    })
      .overrideProvider(AddressesService)
      .useValue(mockAddressService)
      .compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of address', async () => {
        expect(controller.getAll());
    })
  })

  describe('getOne', () => {
    it('should return a one address', async () => {
        expect(controller.getOne(1)).toEqual(
          {
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            countryCode: 'sasa',
            countryState: 'sas',
            cityName: 'sasa',
            streetName: 'sasa',
            streetNumber: 198,
            zipCode: 'sasa',
            floor: 232,
            office: 'dsdsa',
            references: 'dsds',
            subjectId: 983,
            subjectType: 'sdsa',
            user: mockUser,
          }
        );
    });
  })
});
