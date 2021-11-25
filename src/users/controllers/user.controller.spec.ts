import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    create: jest.fn(user =>{
        return {
            
            ...user
        };
    }),
    update: jest.fn((id,user) =>({
        id,
        ...user
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () =>{

    const user = {
        id: 1,
        username: 'Pablo',
        password: 'asd',
        email: 'asd@gmail.com',
        account_status: 1
    }

    expect(controller.create(user)).toEqual({
            id: 1,
            username: 'Pablo',
            password: 'asd',
            email: 'asd@gmail.com',
            account_status: 1
        })

    expect(mockUserService.create).toHaveBeenCalledWith(user)
  })

  it('should update a user', () => {
    const user = {
        id: 1,
        username: 'Pablo',
        password: 'asd',
        email: 'asd@gmail.com',
        account_status: 1
    };

  expect(controller.update(1,user)).toEqual({
      id: 1,
      ...user
  })

})

});