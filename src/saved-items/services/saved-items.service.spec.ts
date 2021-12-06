import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemsService } from './saved-items.service';

describe('SavedItemsService', () => {
  let service: SavedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedItemsService],
    }).compile();

    service = module.get<SavedItemsService>(SavedItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
