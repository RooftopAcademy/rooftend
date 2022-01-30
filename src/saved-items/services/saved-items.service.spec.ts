import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSavedItemDto } from '../dto/createSavedItemDto';
import { SavedItemsEntity } from '../entities/savedItems.entity';
import { SavedItemsService } from './saved-items.service';

describe('SavedItemsService', () => {
  let service: SavedItemsService;

  const mockSavedItemsRepository = {
    find: jest.fn(
      () =>
        new Promise((resolve, reject) => {
          resolve([{ id: 1, itemId: 1, userId: 1, quantity: 1, price: 1 }]);
        }),
    ),
    create: jest.fn(
      (dto) =>
        new Promise((resolve, reject) => {
          resolve({ id: 1, ...dto });
        }),
    ),
    save: jest.fn(
      (fullEntity) =>
        new Promise((resolve, reject) => {
          resolve(fullEntity);
        }),
    ),
    update: jest.fn(
      (id, dto) =>
        new Promise((resolve, reject) => {
          resolve({ id, itemId: 1, userId: 1, ...dto });
        }),
    ),
    delete: jest.fn(
      (id) =>
        new Promise((resolve, reject) => {
          resolve({ raw: [], affected: 1 });
        }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SavedItemsService,
        {
          provide: getRepositoryToken(SavedItemsEntity),
          useValue: mockSavedItemsRepository,
        },
      ],
    }).compile();

    service = module.get<SavedItemsService>(SavedItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of saved items', async () => {
    expect(await service.getAllSavedItems()).toEqual([
      {
        id: expect.any(Number),
        itemId: expect.any(Number),
        userId: expect.any(Number),
        quantity: expect.any(Number),
        price: expect.any(Number),
      },
    ]);
  });

  it('should create a saved item', async () => {
    const createSavedItemDto: CreateSavedItemDto = {
      itemId: 1,
      userId: 1,
      quantity: 1,
      price: 1,
    };

    expect(await service.createSavedItem(createSavedItemDto)).toEqual({
      id: expect.any(Number),
      itemId: expect.any(Number),
      userId: expect.any(Number),
      quantity: expect.any(Number),
      price: expect.any(Number),
    });
  });

  it('should remove a saved item and return delete result', async () => {
    expect(await service.removeSavedItem(1)).toEqual({
      raw: [],
      affected: expect.any(Number),
    });
  });
});
