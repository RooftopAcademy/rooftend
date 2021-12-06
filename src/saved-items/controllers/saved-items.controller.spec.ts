import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemsController } from './saved-items.controller';

describe('SavedItemsController', () => {
  let controller: SavedItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedItemsController],
    }).compile();

    controller = module.get<SavedItemsController>(SavedItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
