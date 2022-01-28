import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { CaslModule } from '../../auth/casl/casl.module';
import STATUS from '../../statusCodes/statusCodes';
import { User } from '../../users/entities/user.entity';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesController } from './favorites.controller';

describe('FavoritesController', () => {
  let controller: FavoritesController;

  const user: User = new User();
  user.id = 1;

  const mockFavoriteService = {
    paginate: jest.fn().mockResolvedValue([
      {
        id: 1,
        user: 1,
        item_id: 1,
        createdAt: new Date(),
      },
    ]),
    create: jest.fn((user: User, body: CreateFavoriteDto) => {
      Promise.resolve({
        item_id: 1,
      });
    }),
    delete: jest.fn(),
    findFavorite: jest.fn().mockImplementation((id) =>
      Promise.resolve(
        plainToClass(Favorite, {
          user: user,
          id: id,
        }),
      ),
    ),
  };

  const response: any = {
    user: new User(),
  };

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
    it('should get 10 favorites records.', async () => {
      const page = 1;
      const limit = 10;
      const route = '/favorites';

      const user: User = new User();
      user.id = 1;

      await expect(controller.paginate(response, page, limit)).resolves.toEqual(
        [
          {
            id: 1,
            user: 1,
            item_id: 1,
            createdAt: expect.any(Date),
          },
        ],
      );

      expect(mockFavoriteService.paginate).toHaveBeenCalledWith(
        { page, limit, route },
        response.user,
      );
    });

    it('should return a NotFoundException message', async () => {
      mockFavoriteService.paginate.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      try {
        expect(await controller.paginate(response, 1)).toThrow(
          NotFoundException,
        );
      } catch (error) {
        expect(error.message).toEqual('Not Found');
      }
    });
  });

  describe('create', () => {
    it('should create a favorite.', async () => {
      const mockUser = new User();
      mockUser.id = 1;

      const request: any = {
        user: mockUser,
      };
      request.user.id = 1;

      const dto: CreateFavoriteDto = {
        itemId: 1,
      };

      expect(await controller.create(request, dto)).toEqual(STATUS.CREATED);

      expect(mockFavoriteService.create).toHaveBeenCalledWith(
        dto,
        request.user,
      );
    });
  });

  describe('delete', () => {
    it('should delete a favorite.', async () => {
      const id = 1;

      const request: any = {
        user: user,
      };

      expect(await controller.delete(request, 1)).toEqual(STATUS.DELETED);
    });

    it('should return a ForbiddenException', async () => {
      await expect(controller.delete(response, 1)).rejects.toThrowError(
        ForbiddenException,
      );
    });
  });
});
