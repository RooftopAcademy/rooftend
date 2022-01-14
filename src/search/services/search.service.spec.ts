import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../../items/entities/items.entity';
import { User } from '../../users/entities/user.entity';
import { Search } from '../entities/search.entity';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  const items = [
    {
      id: 1,
      createdAt: '2016-03-26 10:10:10-05:00',
      updatedAt: '2016-03-26 10:10:10-05:00',
      title: 'Televisor LED Phillips 50 pulgadas',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
      price: 1050.99,
      stock: 10,
      brandId: 10,
      userId: 999,
      categoryId: 999,
    },
  ];

  const user = {
    id: 1,
    username: 'pepito',
    password: '123abc',
    email: 'peipito@gmail.com',
    account_status: 1,
  };

  const mockSearchesRepository = {
    save: jest.fn(),
  };

  const mockUsersRepository = {
    findOne: jest.fn(() => user),
  };

  const mockItemsRepository = {
    find: jest.fn(() => items),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getRepositoryToken(Search),
          useValue: mockSearchesRepository,
        },
        { provide: getRepositoryToken(Item), useValue: mockItemsRepository },
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the search result', async () => {
    expect(await service.findAll('televisor')).toBe(items);

    expect(mockSearchesRepository.save).toHaveBeenCalled();
    expect(mockSearchesRepository.save).toHaveBeenCalledWith({
      keywords: 'televisor',
      user,
    });
  });
});
