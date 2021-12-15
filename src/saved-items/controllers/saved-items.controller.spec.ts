import { Test, TestingModule } from '@nestjs/testing';
import { SavedItemsController } from './saved-items.controller';
import { SavedItemsService } from '../services/saved-items.service';
import { response } from 'express';

describe('SavedItemsController', () => {
  let controller: SavedItemsController;

  const SavedItemsServiceMock = {
    getAllSavedItems: jest.fn(
      () =>
        new Promise((resolve, reject) => {
          resolve([{ itemId: 1, userId: 1, quantity: 1, price: 1 }]);
        }),
    ),
    createSavedItem: jest.fn(
      (dto) =>
        new Promise((resolve, reject) => {
          resolve({ id: 1, ...dto });
        }),
    ),
    updateSavedItem: jest.fn(
      (id, dto) =>
        new Promise((resolve, reject) => {
          resolve({ id, itemId: 1, userId: 1, ...dto });
        }),
    ),
  };

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

  it('should return all database items', async () => {
    expect(await controller.findAll(response)).toEqual([
      {
        itemId: expect.any(Number),
        userId: expect.any(Number),
        quantity: expect.any(Number),
        price: expect.any(Number),
      },
    ]);
  });

  it('should return an object containing a message and the created item', async () => {
    const item = { itemId: 1, userId: 1, quantity: 1, price: 1 };
    expect(await controller.create(response, item)).toEqual({
      message: 'Successfully created',
      item: {
        itemId: expect.any(Number),
        userId: expect.any(Number),
        quantity: expect.any(Number),
        price: expect.any(Number),
      },
    });
  });

  it('should return a message for successful update', async () => {
    const item = { quantity: 1, price: 1 };
    expect(await controller.update(response, 1, item)).toEqual(
      expect.any(String),
    );
  });

  it('should return a message for successful delete', async () => {
    expect(await controller.remove(response, 1)).toEqual(expect.any(String));
  });
});
