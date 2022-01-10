import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { OffersController } from './offers.controller';
import { OffersService } from '../services/offers.service';

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
});
