import { Test, TestingModule } from '@nestjs/testing';
import { MessagePostPurchaseController } from './message-post-purchase.controller';

describe('MessagePostPurchaseController', () => {
  let controller: MessagePostPurchaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagePostPurchaseController],
    }).compile();

    controller = module.get<MessagePostPurchaseController>(MessagePostPurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
