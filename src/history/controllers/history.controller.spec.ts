import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import { CaslModule } from '../../auth/casl/casl.module';
import { Brand } from '../../brands/entities/brands.entity';
import { Category } from '../../categories/entities/categories.entity';
import { Item } from '../../items/entities/items.entity';
import STATUS from '../../statusCodes/statusCodes';
import { User } from '../../users/entities/user.entity';
import { HistoryService } from '../services/history.service';
import { HistoryController } from './history.controller';

describe('HistoryController', () => {
  let controller: HistoryController;

  const mockHistoryService = {
    paginate: jest.fn().mockResolvedValue(
        {
          items: [
            {
              id: 1,
              user_id: 1,
              createdAt: new Date(),
            },
          ],
        },
      ),
    delete: jest.fn(),
    findHistory: jest.fn().mockImplementation(() => {
      const user = new User()
      user.id = 1;
      return Promise.resolve(user);
    }),
  };

  const mockUser = new User();
  mockUser.id = 1;

  const request: any = {
    user: mockUser,
  };
  request.user.id = 1;


  const mockUser2 = new User();
  mockUser2.id = 2;

  const request2: any = { user: mockUser2 };

  const mockItem = {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'Name',
    description: 'Des',
    price: 1,
    stock: 1,
    brand: new Brand(),
    user: request.user,
    category: new Category(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [HistoryService],
      imports: [CaslModule],
    })
    .overrideProvider(HistoryService)
    .useValue(mockHistoryService)
    .compile();

    controller = module.get<HistoryController>(HistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });  

  describe('getAll', () => {
    const page = 1;
    const limit = 10;
    const route = '/history';

    it('should return a list of history', async () => {
      expect(await controller.getAll(request)).toEqual(
        {
          items: [
            {
              id: 1,
              user_id: 1,
              createdAt: expect.any(Date),
            },
          ],
        },
      )

      expect(mockHistoryService.paginate).toHaveBeenCalledWith(
        {
          page,
          limit,
          route
        },
        request.user,
      );
    })
  });

  /* describe('delete', () => {
    const id = 1;

    it('should deleted history', async () => {
      expect(await controller.delete(request, id)).toEqual(STATUS.DELETED);

      expect(mockHistoryService.delete).toHaveBeenLastCalledWith(id);
    });
  }); */
  describe('delete', () => {
    /* it('should remove a History', async () => {
      expect(await controller.delete(request, 1)).toEqual(STATUS.DELETED);

      expect(mockHistoryService.delete).toHaveBeenCalledWith({
        id: 1,
        user: 1,
        item: expect.any(Item),
        createdAt: new Date(),
      });
    }); */

    it('should return a ForbiddenException', async () => {
      await expect(controller.delete(request2, 1)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should return a NotFoundException', async () => {
      mockHistoryService.findHistory.mockRejectedValueOnce(new NotFoundException());
  
      await expect(controller.delete(request, 1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
