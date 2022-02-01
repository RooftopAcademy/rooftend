import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountStatusesEnum } from '../../account-status/models/AccountStatusesEnum';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { User } from '../../users/entities/user.entity';
import { UserService } from '../../users/services/user.service';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  const registeredUsers = [
    {
      email: 'email1@gmail.com',
      password: 'anyPass111_',
      accountStatus: 2,
    },
    {
      email: 'email2@gmail.com',
      password: 'anyPass1yy_',
      accountStatus: 2,
    },
    {
      email: 'email3@gmail.com',
      password: 'anyValidPass123_',
      accountStatus: 3,
    },
    {
      email: 'email4@gmail.com',
      password: 'anyValidPass123_',
      accountStatus: 4,
    },
  ];

  const user: CreateUserDTO = {
    email: 'userEmail@gmail.com',
    password: 'anyvalidpass123_',
    passwordConfirmation: 'anyvalidpass123_',
  };

  const mockAuthService = {
    checkEmail: jest.fn().mockImplementation((user: CreateUserDTO) => {
      registeredUsers.forEach((u) => {
        if (u.email == user.email) {
          throw new HttpException(
            'The user is already registered',
            HttpStatus.CONFLICT,
          );
        }
      });
    }),
    create: jest.fn(() => {
      return;
    }),
    validateUser: jest.fn().mockImplementation((email: string) => {
      for (let i = 0; i < registeredUsers.length; i++) {
        if (registeredUsers[i].email == email) {
          return registeredUsers[i].email;
        }
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }),
    validatePassword: jest
      .fn()
      .mockImplementation((user: User, pass: string) => {
        for (let i = 0; i < registeredUsers.length; i++) {
          if (registeredUsers[i].password == pass) {
            return registeredUsers[i].email;
          }
        }
        return null;
      }),
    confirmRegistry: jest.fn().mockImplementation((token: string) => {
      // Decipher process simulation
      const email = token.split('*')[0];
      const u = mockUserService.findOneByEmail(email);
      if (!u) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      if (u.accountStatus == AccountStatusesEnum.ACTIVE) {
        throw new HttpException('USER_IS_ALREADY_ACTIVE', HttpStatus.CONFLICT);
      }
      if (
        u.accountStatus == AccountStatusesEnum.BLOCKED ||
        u.accountStatus == AccountStatusesEnum.INACTIVE
      ) {
        throw new HttpException(
          'USER_IS_INACTIVE_OR_BLOCKED',
          HttpStatus.FORBIDDEN,
        );
      }
      return {
        accessToken: mockJwtService.sign(token),
      };
    }),
    login: jest.fn().mockImplementation((user: CreateUserDTO) => {
      let foundUser;
      for (let i = 0; i < registeredUsers.length; i++) {
        if (registeredUsers[i].email == user.email) {
          foundUser = registeredUsers[i];
        }
      }
      if (!foundUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        accessToken: mockJwtService.sign(user.email),
      };
    }),
  };

  const mockUserService = {
    findOneByEmail: jest.fn().mockImplementation((email: string) => {
      let regUser;
      for (let i = 0; i < registeredUsers.length; i++) {
        if (registeredUsers[i].email == email) {
          regUser = registeredUsers[i];
        }
      }
      return regUser;
    }),
    create: jest.fn().mockReturnThis(),
  };

  const mockJwtService = {
    sign: jest.fn((value: any) => {
      return 'tokenstring';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService, UserService, JwtService],
    })
      .overrideProvider(AuthenticationService)
      .useValue(mockAuthService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(jest.clearAllMocks);

  describe('checkEmail', () => {
    it('should return void if the email address has not been used', async () => {
      const check = await service.checkEmail(user);
      expect(check).toBeUndefined();
      expect(mockAuthService.checkEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the address is already being used', () => {
      expect(() => {
        service.checkEmail({
          email: 'email1@gmail.com',
          password: 'anyValidPass123:',
          passwordConfirmation: 'anyValidPass123:',
        });
      }).toThrowError(/The user is already registered/);
      expect(mockAuthService.checkEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const newUser = service.create(user);
      expect(newUser).toBeUndefined;
    });
  });

  describe('validate user with email', () => {
    it('should throw an error during validation', async () => {
      expect(() => {
        service.validateUser('userEmail@gmail.com');
      }).toThrowError(/User not found/);
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
    });

    it('should validate the user email', () => {
      expect(service.validateUser('email1@gmail.com')).toEqual(
        'email1@gmail.com',
      );
      expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);
    });
  });
  describe('validate password', () => {
    it('should validate the user with password checking', () => {
      const validUser: User = new User();
      user.email = 'email1@gmail.com';
      user.password = 'anyPass111_';
      expect(service.validatePassword(validUser, 'anyPass111_')).toEqual(
        'email1@gmail.com',
      );
      expect(mockAuthService.validatePassword).toHaveBeenCalledTimes(1);
    });

    it('should return null if the password is wrong', () => {
      const wrongUser: User = new User();
      wrongUser.email = 'email1@gmail.com';
      wrongUser.password = 'anyPass111_';
      expect(service.validatePassword(wrongUser, 'an987987_')).toBeNull();
      expect(mockAuthService.validatePassword).toHaveBeenCalledTimes(1);
    });
  });

  describe('Registry confirmation', () => {
    it('should confirm a valid user registration returning a token', () => {
      const mockTransToken = 'email2@gmail.com*aytttacac32nyPass1yy_';
      expect(service.confirmRegistry(mockTransToken)).toEqual({
        accessToken: expect.any(String),
      });
      expect(mockUserService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
    });

    it('should throw an error is transaction token is invalid', () => {
      const invalidTransToken = 'emfakel2@gmail.com*aytttacac32nyPass1yy_';
      const fail = () => {
        service.confirmRegistry(invalidTransToken);
      };
      expect(fail).toThrowError(/USER_NOT_FOUND/);
      expect(mockUserService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(0);
    });

    it("should throw an error if the user's status is ACTIVE", async () => {
      const invalidTransTocken = 'email3@gmail.com*jkosd234jkd';
      const fail = () => {
        service.confirmRegistry(invalidTransTocken);
      };
      expect(fail).toThrowError(/USER_IS_ALREADY_ACTIVE/);
      expect(mockUserService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(0);
    });

    it("should throw an error if the user's status is BLOCKED or INACTIVE", () => {
      const invalidTransTocken = 'email4@gmail.com*jkosd234jkd23';
      const fail = () => {
        service.confirmRegistry(invalidTransTocken);
      };
      expect(fail).toThrowError(/USER_IS_INACTIVE_OR_BLOCKED/);
      expect(mockUserService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(0);
    });
  });

  describe('Login', () => {
    it('should login a user', () => {
      expect(
        mockAuthService.login({
          email: 'email2@gmail.com',
          password: 'anyValidPass123_',
        }),
      ).toEqual({
        accessToken: expect.any(String),
      });
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });

    it('should throw an error for invalid email or password', () => {
      expect(() => {
        mockAuthService.login({
          email: 'notRegistered@gmail.com',
          password: 'anyValidPass123_',
        });
      }).toThrowError(/User not found/);
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });
  });
});
