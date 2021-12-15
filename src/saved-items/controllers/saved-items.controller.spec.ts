import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemsController } from './saved-items.controller';
import { SavedItemsService } from '../services/saved-items.service';

describe('SavedItemsController', () => {
  let controller: SavedItemsController;
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

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

  it('should return all database items', () => {
    expect(controller.findAll(mockResponse())).resolves.toBe([
      { itemId: 1, userId: 1, quantity: 1, price: 1 },
    ]);
  });

  it('should return an object containing a message and the created item', () => {
    const item = { itemId: 1, userId: 1, quantity: 1, price: 1 };
    expect(controller.create(mockResponse(), item)).resolves.toEqual({
      message: 'Successfully created',
      item,
    });
  });

  it('should return a message for successful update', () => {
    const item = { quantity: 1, price: 1 };
    expect(controller.update(mockResponse(), 1, item)).resolves.toEqual(
      'Successfully updated',
    );
  });

  it('should return a message for successful delete', () => {
    expect(controller.remove(mockResponse(), 1)).resolves.toEqual(
      'Successfully deleted',
    );
  });
});
