import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { OffersController } from './offers.controller';
import { OffersService } from '../services/offers.service';
import { PromotionType } from '../entities/offer.entity';

describe('OffersController', () => {
  let controller: OffersController;

  const mockOffersService = {
    paginate: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [OffersService],
    })
      .overrideProvider(OffersService)
      .useValue(mockOffersService)
      .compile();

    controller = module.get<OffersController>(OffersController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Service should be called with default parameters', () => {
    const paginateOptions = {
      page: 1,
      limit: 50,
      route: '/offers',
    };
    controller.findAll();
    expect(mockOffersService.paginate).toBeCalledWith(paginateOptions);
  });

  it('Sevice should be called with a specific value for page parameter', () => {
    const paginateOptions = {
      page: 2,
      limit: 50,
      route: '/offers',
    };
    controller.findAll(2);
    expect(mockOffersService.paginate).toBeCalledWith(paginateOptions);
  });

  it('Sevice should be called with promotion type parameter and pagination order', () => {
    const paginateOptions = {
      page: 2,
      limit: 50,
      route: '/offers',
    };
    const promotionType: PromotionType = PromotionType.DEAL_OF_THE_DAY;
    const order = "DESC";
    controller.findAll(2, promotionType,order);
    expect(mockOffersService.paginate).toBeCalledWith(paginateOptions, promotionType, order);
  });
});
