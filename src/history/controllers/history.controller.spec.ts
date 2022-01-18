import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import { CaslModule } from '../../auth/casl/casl.module';
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
    delete: jest.fn().mockImplementation(() => STATUS.DELETED),
    findHistory: jest.fn().mockImplementation(() => {
      return {
        id: 1,
        user_id: 1,
        createdAt: new Date(),
      };
    }),
  };

  const request: any = {
    user: new User(),
  };
  request.user.id = 1;

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

  describe('delete', () => {
    const id = 1;

    it('should deleted history', async () => {
      expect(await controller.delete(request, id)).toEqual(true);

      expect.any({ 
        id: 1,
        user_id: 1,
        createdAt: expect.any(Date), 
      }),0;
    });
  });

  /* it('should return a ForbiddenError message', async () => {
    mockHistoryService.delete.mockImplementationOnce(() => { throw new ForbiddenException() });

    try {
      expect(await controller.delete(response, id)).toThrow(ForbiddenException);
    } catch(error) {
      expect(error.message).toEqual('Forbidden');
    };
  }); */
});
