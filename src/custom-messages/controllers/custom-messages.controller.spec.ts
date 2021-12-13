import { Test, TestingModule } from '@nestjs/testing';
import { ControllersController } from './custom-messages.controller';

describe('ControllersController', () => {
  let controller: ControllersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControllersController],
    }).compile();

    controller = module.get<ControllersController>(ControllersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
