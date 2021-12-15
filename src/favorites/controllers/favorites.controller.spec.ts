import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesController } from './favorites.controller';

describe('FavoritesController', () => {
  let controller: FavoritesController;

  const mockFavoriteService = {
    paginate: jest.fn(),
    create: jest.fn(dto => {
      return {
        ...dto,
        user_id: 24
      }
    }),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [FavoritesService]
    })
      .overrideProvider(FavoritesService)
      .useValue(mockFavoriteService)
      .compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get 10 favorites records.', () => {
    const page = 1
    const limit = 10
    const token = 1
    expect(controller.paginate(token, page, limit)).not.toBeUndefined()
    expect(mockFavoriteService.paginate).toHaveBeenCalled()
  })

  it('should create a favorite.', () => {
    const data = { item_id: 61 }
    const token = 1
    expect(controller.create(token, data)).toEqual({
      "message": "Created",
      "statusCode": 201,
    });
    expect(mockFavoriteService.create).toHaveBeenCalledWith(data, token)
  });

  it('should delete a favorite.', () => {
    const okResponse = { "message": "Ok", "statusCode": 200}
    const favoriteId = 1
    expect(controller.delete(favoriteId)).toStrictEqual(okResponse)
    expect(mockFavoriteService.delete).toHaveBeenCalledWith(favoriteId)
  })
});
