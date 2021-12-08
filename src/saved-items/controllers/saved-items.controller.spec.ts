import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemsController } from './saved-items.controller';
import { SavedItemsService } from '../services/saved-items.service';

describe('SavedItemsController', () => {
  let controller: SavedItemsController;

  const SavedItemsServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedItemsService],
      controllers: [SavedItemsController],
    })
      .overrideProvider(SavedItemsService)
      .useValue(SavedItemsServiceMock)
      .compile();

    controller = module.get<SavedItemsController>(SavedItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
