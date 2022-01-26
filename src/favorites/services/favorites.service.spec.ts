const itemsList = [{
  id: 1, 
  user: 1, 
  item_id: 1, 
  createdAt: Date.now()
}];

const list = {
  items: itemsList.slice(0, 2),
    meta: {
      itemCount: 2,
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
    },
};

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue(list),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { User } from '../../users/entities/user.entity';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const mockFavoriteRepository = {
    paginate: jest.fn().mockResolvedValue({
      page: '1',
      limit: '10',
    }),
    create: jest.fn((body: CreateFavoriteDto) => ({
      itemId: body.itemId,
    })),
    save: jest.fn().mockImplementation(favorite => Promise.resolve({
      id: Date.now(),
      ...favorite,
      updated_at: Date.now(),
    })),
    delete: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesService , {
        provide: getRepositoryToken(Favorite),
        useValue: mockFavoriteRepository
      }],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('paginate', () => {
    it('should return an favorite pagination', async () => {
      const options: IPaginationOptions = { 
        page: 1, 
        limit: 10, 
      };

      expect((await service.paginate(options, new User))).toEqual(list);
    });
  });

  describe('create', () => {
    it('should create a new favorite record.', async () => {
      const createFavoriteDto: CreateFavoriteDto = { itemId: 62 };

      const user: User = new User();
      user.id = 1;

      const dto = {
        itemId: 62,
        user: user,
      };

      const expected = {
        itemId: 62,
      };

      expect(await service.create(createFavoriteDto, user)).toBeUndefined();

      expect(mockFavoriteRepository.create).toHaveBeenCalledWith(dto);

      expect(mockFavoriteRepository.save).toHaveBeenCalledWith(expected);
    });
  });

  describe('delete', () => {
    it('should delete a favorite.', async () => {
      const itemid = 1;

      expect(await service.delete(itemid)).toBeUndefined();

      expect(mockFavoriteRepository.delete).toHaveBeenCalledWith(itemid);
    });
  });
});
