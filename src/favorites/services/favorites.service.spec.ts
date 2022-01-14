import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const mockFavoriteRepository = {
    paginate: jest.fn(),
    create: jest.fn(),
    save: jest.fn().mockImplementation(favorite => Promise.resolve({
      id: Date.now(),
      ...favorite,
      updated_at: Date.now()
    })),
    delete: jest.fn().mockImplementation(() => Promise.resolve())
  }

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
    it('should return an favorite pagination')
  });

  describe('create', () => {
    it('should create a new favorite record.', async () => {
      const createFavoriteDto: CreateFavoriteDto = { item_id: 62 }
      const token = 1

      expect(await service.create(createFavoriteDto, token)).toBeUndefined();

      expect(mockFavoriteRepository.create).toHaveBeenCalledWith({...createFavoriteDto, "user_id": token});

      expect(mockFavoriteRepository.save).toHaveBeenCalled();
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
