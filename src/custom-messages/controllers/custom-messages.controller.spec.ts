import { Test, TestingModule } from '@nestjs/testing';
import { CustomMessagesController } from './custom-messages.controller';

describe('ControllersController', () => {
  let controller: CustomMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomMessagesController],
    }).compile();

    controller = module.get<CustomMessagesController>(CustomMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
