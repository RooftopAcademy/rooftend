import { Test, TestingModule } from '@nestjs/testing';
import { CustomMessagesService } from './custom-messages.service';

describe('CustomMessagesService', () => {
  let service: CustomMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomMessagesService],
    }).compile();

    service = module.get<CustomMessagesService>(CustomMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
