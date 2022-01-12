import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { User } from '../../users/entities/user.entity';
import { CreateCustomMessageDTO } from '../entities/create-custom-messages.dto';
import { CustomMessage } from '../entities/custom-messages.entity';
import { CustomMessagesService } from './custom-messages.service';

describe('CustomMessagesService', () => {
  let service: CustomMessagesService;

  const userId = 1;
  const newUser = new User();
  const mockUser = new User();
  mockUser.id = userId;
  newUser.id = 1;

  const genericCustomMessage = plainToClass(CustomMessage, {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    message: 'Texto 1',
    user: mockUser,
    subject: 'Tema 1',
  });

  const mockCustomMessagesRepository = {
    softDelete: jest.fn(() => Promise.resolve(true)),
    save: jest.fn((customMessage: CustomMessage) => customMessage),
    create: jest.fn((customMessage: CustomMessage) =>
      Object.assign(customMessage, { id: 4, user: newUser }),
    ),
    merge: jest.fn((customMessage, body) => Object.assign(customMessage, body)),
    find: jest.fn(({ user }): CustomMessage[] => [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        message: 'Texto 1',
        user,
        subject: 'Tema 1',
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        message: 'Texto 2',
        user,
        subject: 'Tema 2',
      },
    ]),
    findOne: jest.fn(() => genericCustomMessage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaslAbilityFactory,
        CustomMessagesService,
        {
          provide: getRepositoryToken(CustomMessage),
          useValue: mockCustomMessagesRepository,
        },
      ],
    }).compile();

    service = module.get<CustomMessagesService>(CustomMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('all', () => {
    it('should return an array of CustomMessages', async () => {
      expect(await service.findAll(newUser)).toEqual([
        {
          id: 1,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          message: 'Texto 1',
          user: newUser,
          subject: 'Tema 1',
        },
        {
          id: 2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          message: 'Texto 2',
          user: newUser,
          subject: 'Tema 2',
        },
      ]);
    });
  });

  describe('one', () => {
    it('should return an Item', async () => {
      newUser.id = userId;

      expect(await service.findOne(newUser, 1)).toEqual({
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        message: 'Texto 1',
        user: newUser,
        subject: 'Tema 1',
      });
    });

    it('should throw a NotFoundException', async () => {
      mockCustomMessagesRepository.findOne.mockReturnValueOnce(null);
      newUser.id = userId;

      try {
        expect(await service.findOne(newUser, 10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Not Found Custom Message');
      }
    });

    it('should throw a ForbiddenException', async () => {
      newUser.id = userId + 1;

      try {
        expect(await service.findOne(newUser, 10)).toThrow(ForbiddenException);
      } catch (err) {
        expect(err.message).toBe('Forbidden');
      }
    });
  });

  describe('create', () => {
    it('should create a Item', async () => {
      const dto: CreateCustomMessageDTO = {
        subject: 'Título 1',
        message: 'Texto 1',
      };

      const expected = {
        id: 4,
        ...dto,
        user: newUser,
      };

      expect(await service.create(newUser, dto)).toEqual(expected);

      expect(mockCustomMessagesRepository.create).toHaveBeenCalledWith(dto);
      expect(mockCustomMessagesRepository.save).toHaveBeenCalledWith(expected);
    });
  });

  describe('update', () => {
    it('should update a CustomMessage', async () => {
      newUser.id = userId;

      const customMessage = {
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        message: 'Texto 1',
        user: mockUser,
        subject: 'Tema 1',
      };

      const dto = {
        message: 'Texto 2',
        subject: 'Tema 2',
      };

      mockCustomMessagesRepository.save.mockReturnValueOnce({
        ...genericCustomMessage,
        ...dto,
      });

      expect(await service.update(newUser, customMessage.id, dto)).toEqual(
        Object.assign(customMessage, dto),
      );

      expect(mockCustomMessagesRepository.findOne).toHaveBeenCalledWith(
        customMessage.id,
      );
      expect(mockCustomMessagesRepository.merge).toHaveBeenCalledWith(
        customMessage,
        dto,
      );
    });

    it('should throw ForbiddenException', async () => {
      newUser.id = userId + 1;
      const dto = {
        stock: 500,
      };

      try {
        expect(
          await service.update(newUser, genericCustomMessage.id, dto),
        ).toThrow(ForbiddenException);
      } catch (err) {
        expect(err.message).toEqual('Forbidden');
      }
    });

    it('should throw NotFoundException', async () => {
      mockCustomMessagesRepository.findOne.mockReturnValueOnce(null);
      const dto = {
        message: 'Texto 3',
      };

      try {
        expect(
          await service.update(newUser, genericCustomMessage.id, dto),
        ).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toEqual('Not Found Custom Message');
      }
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      newUser.id = userId;
      expect(await service.delete(newUser, genericCustomMessage.id)).toEqual(
        true,
      );

      expect(mockCustomMessagesRepository.findOne).toHaveBeenCalledWith(
        genericCustomMessage.id,
      );
      expect(mockCustomMessagesRepository.softDelete).toHaveBeenCalled();
    });

    it('should throw ForbiddenException', async () => {
      newUser.id = userId + 1;

      try {
        expect(await service.delete(newUser, genericCustomMessage.id)).toThrow(
          ForbiddenException,
        );
      } catch (err) {
        expect(err.message).toBe('Forbidden');
      }

      expect(mockCustomMessagesRepository.findOne).toHaveBeenCalledWith(
        genericCustomMessage.id,
      );
      expect(mockCustomMessagesRepository.softDelete).toHaveBeenCalledTimes(1);
    });
  });
});
