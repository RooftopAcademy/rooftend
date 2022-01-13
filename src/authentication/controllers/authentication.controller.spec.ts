import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  const mockReq = {
    user: {
      id: 2,
      email: 'userEmail@gmail.com',
    },
  } as unknown as Request;

  const validUser = {
    email: 'userEmail@gmail.com',
    password: 'validPass123-',
  };

  const mockAuthenticationService = {
    checkEmail: jest.fn().mockReturnThis(),
    create: jest.fn().mockReturnThis(),
    login: jest.fn().mockReturnValue({
      accessToken: 'tokenstring',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    })
      .overrideProvider(AuthenticationService)
      .useValue(mockAuthenticationService)
      .compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(jest.clearAllMocks);
  describe('register', () => {
    it('should register a new user', async () => {
      const register = await controller.register(validUser);
      expect(typeof register).toBe('object');
      expect(register).toEqual({
        accessToken: expect.any(String),
      });
      expect(mockAuthenticationService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthenticationService.login).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login a valid user', async () => {
      const login = await controller.login(mockReq);
      expect(mockAuthenticationService.login).toHaveBeenCalled();
      expect(typeof login).toBe('object');
      expect(login).toEqual({
        accessToken: expect.any(String),
      });
      expect(mockAuthenticationService.login).toHaveBeenCalledTimes(1);
    });
  });
});
