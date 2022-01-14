import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { CreateCustomMessageDTO } from '../entities/create-custom-messages.dto';
import { CustomMessage } from '../entities/custom-messages.entity';
import { CustomMessagesService } from './custom-messages.service';

describe('CustomMessagesService', () => {
  let service: CustomMessagesService;

  const newUser = new User();
  newUser.id = 1;

  const genericCustomMessage = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    message: 'Texto 1',
    user: newUser,
    subject: 'Tema 1',
  };

  const mockCustomMessagesRepository = {
    softDelete: jest.fn(() => Promise.resolve(true)),
    save: jest.fn((customMessage: CustomMessage) => customMessage),
    create: jest.fn((customMessage: CustomMessage) =>
      Object.assign(customMessage, { id: 4, user: newUser }),
    ),
    merge: jest.fn((customMessage, body) => Object.assign(customMessage, body)),
    find: jest.fn(({ user: { id } }): CustomMessage[] => { 
      const user = new User();
      user.id = id;
      return [
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
    ]}),
    findOne: jest.fn(() => genericCustomMessage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
      expect(await service.findOne(1)).toEqual({
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

      try {
        expect(await service.findOne(10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Not Found Custom Message');
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
    const updateMethod = async (dto) => {
      const customMessage = await service.findOne(genericCustomMessage.id);
      return await service.update(customMessage, dto);
    };

    it('should update a CustomMessage', async () => {
      const customMessage = {
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        message: 'Texto 1',
        user: newUser,
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

      expect(await updateMethod(dto)).toEqual(
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

    it('should throw NotFoundException', async () => {
      mockCustomMessagesRepository.findOne.mockReturnValueOnce(null);
      const dto = {
        message: 'Texto 3',
      };

      try {
        expect(await updateMethod(dto)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toEqual('Not Found Custom Message');
      }
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      expect(await service.delete(genericCustomMessage.id)).toEqual(true);

      expect(mockCustomMessagesRepository.findOne).toHaveBeenCalledWith(
        genericCustomMessage.id,
      );
      expect(mockCustomMessagesRepository.softDelete).toHaveBeenCalled();
    });
  });
});
