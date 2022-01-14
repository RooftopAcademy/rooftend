import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { CaslModule } from '../../auth/casl/casl.module';
import { User } from '../../users/entities/user.entity';
import { CreateCustomMessageDTO } from '../entities/create-custom-messages.dto';
import { CustomMessage } from '../entities/custom-messages.entity';
import { CustomMessagesService } from '../services/custom-messages.service';
import { CustomMessagesController } from './custom-messages.controller';

describe('ControllersController', () => {
  let controller: CustomMessagesController;

  const userId = 20;
  const newUser = new User();
  const mockUser = new User();
  mockUser.id = userId;
  newUser.id = 20;

  const request: any = {
    user: {
      result: newUser,
    },
  };

  const genericCustomMessage = plainToClass(CustomMessage, {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    message: 'Texto 1',
    user: mockUser,
    subject: 'Tema 1',
  });

  const mockCustomMessagesService = {
    delete: jest.fn(() => Promise.resolve(true)),
    create: jest.fn((user, customMessage) => {
      customMessage.id = 4;
      customMessage.user = user;
      return customMessage;
    }),
    update: jest.fn((customMessage, body) =>
      Object.assign(customMessage, body),
    ),
    findAll: jest.fn((): CustomMessage[] => [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        message: 'Texto 1',
        user: newUser,
        subject: 'Tema 1',
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        message: 'Texto 2',
        user: newUser,
        subject: 'Tema 2',
      },
    ]),
    findOne: jest.fn(() => genericCustomMessage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomMessagesController],
      providers: [CustomMessagesService],
      imports: [CaslModule],
    })
      .overrideProvider(CustomMessagesService)
      .useValue(mockCustomMessagesService)
      .compile();

    controller = module.get<CustomMessagesController>(CustomMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('all', () => {
    it('should return an array of CustomMessages', async () => {
      expect(await controller.getAll(request)).toEqual([
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
      expect(await controller.getOne(request, 1)).toEqual({
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        message: 'Texto 1',
        user: newUser,
        subject: 'Tema 1',
      });
    });

    it('should throw a NotFoundException', async () => {
      mockCustomMessagesService.findOne.mockImplementationOnce(() => {
        throw new NotFoundException('Not Found Custom Message');
      });

      try {
        expect(await controller.getOne(request, 10)).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Not Found Custom Message');
      }
    });

    it('should throw a ForbiddenException', async () => {
      newUser.id = userId + 1;

      try {
        expect(await controller.getOne(request, 10)).toThrow(
          ForbiddenException,
        );
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

      expect(await controller.create(request, dto)).toEqual(expected);
    });
  });

  describe('update', () => {
    const dto = {
      message: 'Texto 2',
      subject: 'Tema 2',
    };

    it('should update a CustomMessage', async () => {
      newUser.id = userId;
      const customMessage = {
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        message: 'Texto 1',
        user: newUser,
        subject: 'Tema 1',
      };

      mockCustomMessagesService.update.mockReturnValueOnce({
        ...genericCustomMessage,
        ...dto,
      });

      expect(
        await controller.update(request, genericCustomMessage.id, dto),
      ).toEqual(Object.assign(customMessage, dto));

      expect(mockCustomMessagesService.findOne).toHaveBeenCalledWith(
        customMessage.id,
      );
    });

    it('should throw a NotFoundException', async () => {
      mockCustomMessagesService.findOne.mockImplementationOnce(() => {
        throw new NotFoundException('Not Found Custom Message');
      });

      try {
        expect(
          await controller.update(request, genericCustomMessage.id, dto),
        ).toThrow(NotFoundException);
      } catch (err) {
        expect(err.message).toBe('Not Found Custom Message');
      }
    });

    it('should throw a ForbiddenException', async () => {
      newUser.id = userId + 1;

      try {
        expect(
          await controller.update(request, genericCustomMessage.id, dto),
        ).toThrow(ForbiddenException);
      } catch (err) {
        expect(err.message).toBe('Forbidden');
      }
    });
  });

  describe('remove', () => {
    it('should remove an Item', async () => {
      newUser.id = userId;

      expect(await controller.delete(request, genericCustomMessage.id)).toEqual(
        true,
      );

      expect(mockCustomMessagesService.findOne).toHaveBeenCalledWith(
        genericCustomMessage.id,
      );
    });
    it('should throw a ForbiddenException', async () => {
      newUser.id = userId + 1;

      try {
        expect(
          await controller.delete(request, genericCustomMessage.id),
        ).toThrow(ForbiddenException);
      } catch (err) {
        expect(err.message).toBe('Forbidden');
      }
    });
  });
});
