import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CaslModule } from '../../auth/casl/casl.module';
import STATUS from '../../statusCodes/statusCodes';
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
    /* create: jest.fn(dto => {
      return {
        ...dto,
        user_id: 24
      }
    }), */
    create: jest.fn((user: User, body: CreateFavoriteDto) => {
      Promise.resolve({
        item_id: body.item_id,
      });
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

      //expect(mockFavoriteService.paginate).toHaveBeenCalled(); -> Va este test?
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

      const dto: CreateFavoriteDto = {
        item_id: 1,
      };

      const mockUser = new User();
      mockUser.id = 1;

      const request: any = {
        user: mockUser,
      };
      request.user.id = 1;

      expect(await controller.create(request, dto)).toEqual({
        item_id: dto.item_id,
      });
  
      //VIEJO -> expect(mockFavoriteService.create).toHaveBeenCalledWith(data, token)

      expect(mockFavoriteService.create).toHaveBeenCalledWith(request.user, dto);
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
    it('should delete a favorite.', async () => {
      const favoriteId = 1;
  
      expect(await controller.delete(favoriteId)).toEqual(STATUS.OK);
  
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
