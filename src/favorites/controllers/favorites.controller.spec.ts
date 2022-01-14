import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CaslModule } from '../../auth/casl/casl.module';
import { User } from '../../users/entities/user.entity';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesController } from './favorites.controller';

describe('FavoritesController', () => {
  let controller: FavoritesController;

  const mockFavoriteService = {
    paginate: jest.fn().mockResolvedValue([
      {
        id: 1,
        user: 1,
        item_id: 1,
        createdAt: new Date(),
      },
    ]),
    create: jest.fn(dto => {
      return {
        ...dto,
        user_id: 24
      }
    }),
    delete: jest.fn(),
    findFavorite: jest.fn(() => new Favorite()),
  };

  const response: any = {
    user: new User()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [FavoritesService],
      imports: [CaslModule],
    })
      .overrideProvider(FavoritesService)
      .useValue(mockFavoriteService)
      .compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('paginate', () => {
    it('should get 10 favorites records.', () => {
      const page = 1;
      const limit = 10;
  
      expect(controller.paginate(response, page, limit)).not.toBeUndefined();
    });

    it('should return a ForbiddenError message', async () => {
      mockFavoriteService.paginate.mockImplementationOnce(() => {
        throw new ForbiddenException();
      });

      try {
        expect(await controller.paginate(response, 1)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual('Forbidden');
      };
    });
  });

  describe('create', () => {
    it('should create a favorite.', async () => {
      const data: any = { item_id: 61 };
      //const token: any = 1;
      const token: any = { 
        user: 1,
        item_id: 1,
      };
      const dto: CreateFavoriteDto = {
        id: 1,
        user: 1,
        item_id: 1,
        updated_at: Date.now(),
      };
  
      expect(controller.create(token, data)).toEqual({
        "message": "Created",
        "statusCode": 201,
      });
  
      expect(mockFavoriteService.create).toHaveBeenCalledWith(data, token)
    });

    it('should return a ForbiddenError message', async () => {
      mockFavoriteService.paginate.mockImplementationOnce(() => {
        throw new ForbiddenException();
      });

      try {
        expect(await controller.paginate(response, 1)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual('Forbidden');
      }
    });
  });

  describe('delete', () => {
    it('should delete a favorite.', () => {
      const okResponse = { "message": "Ok", "statusCode": 200}
      const favoriteId = 1
  
      expect(controller.delete(favoriteId)).toStrictEqual(okResponse);
  
      expect(mockFavoriteService.delete).toHaveBeenCalledWith(favoriteId);
    });

    it('should return a ForbiddenError message', async () => {
      mockFavoriteService.paginate.mockImplementationOnce(() => {
        throw new ForbiddenException();
      });

      try {
        expect(await controller.paginate(response, 1)).toThrow(ForbiddenException);
      } catch (error) {
        expect(error.message).toEqual('Forbidden');
      }
    });
  });
});
