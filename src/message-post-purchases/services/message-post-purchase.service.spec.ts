import { Test, TestingModule } from '@nestjs/testing';
import { MessagePostPurchaseService } from './message-post-purchase.service';

describe('MessagePostPurchaseService', () => {
  let service: MessagePostPurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagePostPurchaseService],
    }).compile();

    service = module.get<MessagePostPurchaseService>(MessagePostPurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
