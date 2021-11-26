import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((user) => user),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return that', async () => {
    const user = {
      id: 1,
      username: 'Pablo',
      password: 'asd',
      email: 'asd@gmail.com',
      account_status: 1,
    };

    expect(await service.create(user)).toEqual({
      id: 1,
      username: 'Pablo',
      password: 'asd',
      email: 'asd@gmail.com',
      account_status: 1,
    });
  });
});
