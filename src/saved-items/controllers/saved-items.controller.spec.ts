import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemsController } from './saved-items.controller';
import { SavedItemsService } from '../services/saved-items.service';
import { response } from 'express';

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

  it('should return all database items', () => {
    expect(controller.findAll(response)).resolves.toBe([
      {
        itemId: expect.any(Number),
        userId: expect.any(Number),
        quantity: expect.any(Number),
        price: expect.any(Number),
      },
    ]);
  });

  it('should return an object containing a message and the created item', () => {
    const item = { itemId: 1, userId: 1, quantity: 1, price: 1 };
    expect(controller.create(response, item)).resolves.toEqual({
      message: 'Successfully created',
      item: {
        itemId: expect.any(Number),
        userId: expect.any(Number),
        quantity: expect.any(Number),
        price: expect.any(Number),
      },
    });
  });

  it('should return a message for successful update', () => {
    const item = { quantity: 1, price: 1 };
    expect(controller.update(response, 1, item)).resolves.toEqual(
      expect.any(String),
    );
  });

  it('should return a message for successful delete', () => {
    expect(controller.remove(response, 1)).resolves.toEqual(expect.any(String));
  });
});
