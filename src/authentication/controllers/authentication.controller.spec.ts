import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { LogInUserDTO } from '../../users/entities/log-in-user-dto.entity';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  const mockBody: LogInUserDTO = {
    password: 'passyPass123;',
    email: 'userEmail@gmail.com',
  };

  const validUser: CreateUserDTO = {
    email: 'userEmail@gmail.com',
    password: 'validPass123-',
    passwordConfirmation: 'validPass123-',
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
  describe('Registration', () => {
    it('should register a new user', async () => {
      const register = await controller.register(validUser);
      expect(typeof register).toBe('object');
      expect(register).toEqual({
        accessToken: expect.any(String),
      });
      expect(mockAuthenticationService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthenticationService.login).toHaveBeenCalled();
    });

    it('should throw an error if the password is missing lowercase letters', async () => {
      const invalidUser = plainToClass(CreateUserDTO, {
        email: 'userEmail@gmail.com',
        password: 'SDUFH123;??',
        passwordConfirmation: 'SDUFH123;??',
      });
      const errors = await validate(invalidUser, { stopAtFirstError: true });
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        matches: 'PASSWORDS_MISSING: LOWER_CASE_LETTER',
      });
    });

    it('should throw an error if the password is missing uppercase letters', async () => {
      const invalidUser = plainToClass(CreateUserDTO, {
        email: 'userEmail@gmail.com',
        password: 'asdkg123;??',
        passwordConfirmation: 'asdkg123;??',
      });
      const errors = await validate(invalidUser, { stopAtFirstError: true });
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        matches: 'PASSWORD_MISSING: UPPER_CASE_LETTER',
      });
    });

    it('should throw an error if the password is missing a special character', async () => {
      const invalidUser = plainToClass(CreateUserDTO, {
        email: 'userEmail@gmail.com',
        password: 'asdkgWERI123',
        passwordConfirmation: 'asdkgWERI123',
      });
      const errors = await validate(invalidUser, { stopAtFirstError: true });
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        matches: 'PASSWORDS_MISSING: SPECIAL_CHARACTER',
      });
    });

    it('should throw an error if the password is missing a number', async () => {
      const invalidUser = plainToClass(CreateUserDTO, {
        email: 'userEmail@gmail.com',
        password: 'asdkgWERIee??',
        passwordConfirmation: 'asdkgWERIee??',
      });
      const errors = await validate(invalidUser, { stopAtFirstError: true });
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        matches: 'PASSWORD_MISSING: NUMBER',
      });
    });

    it('should throw an error if the password length is too short', async () => {
      const invalidUser = plainToClass(CreateUserDTO, {
        email: 'userEmail@gmail.com',
        password: 'agWE1?',
        passwordConfirmation: 'agWE1?',
      });
      const errors = await validate(invalidUser, { stopAtFirstError: true });
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        minLength: 'PASSWORD_MIN_LENGTH: 8',
      });
    });

    it('should throw an error if the password length is too long', async () => {
      const invalidUser = plainToClass(CreateUserDTO, {
        email: 'userEmail@gmail.com',
        password: 'agWE1?agWE1?agWE1?',
        passwordConfirmation: 'agWE1?agWE1?agWE1?',
      });
      const errors = await validate(invalidUser, { stopAtFirstError: true });
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        maxLength: 'PASSWORD_MAX_LENGTH: 16',
      });
    });
  });

  describe('Login', () => {
    it('should login a valid user', async () => {
      const login = await controller.login(mockBody);
      expect(mockAuthenticationService.login).toHaveBeenCalled();
      expect(typeof login).toBe('object');
      expect(login).toEqual({
        accessToken: expect.any(String),
      });
      expect(mockAuthenticationService.login).toHaveBeenCalledTimes(1);
    });
  });
});
