import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { HistoryService } from '../../services/history/history.service';
import { HistoryController } from './history.controller';

describe('HistoryController', () => {
  let controller: HistoryController;

  const mockHistoryService = {
    getAll: jest.fn().mockImplementation(() => {
      Promise.resolve([
        {
          id: 1,
          user_id: 1,
          createdAt: new Date(),
        },
      ]);
    }),
    delete: jest.fn().mockImplementation((id) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [HistoryService],
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
    it('should return a list of history'), () => {
      expect(controller.getAll()).toEqual([
        {
          id: 1,
          user_id: 1,
          createdAt: new Date(),
        },
      ]);

      expect(mockHistoryService.getAll).toHaveBeenCalled();

      expect(mockHistoryService.getAll).toHaveBeenCalledWith();
    };
  });

  describe('delete', () => {
    it('should delete history', async () => {
      expect(await controller.delete(1)).toEqual(true);

      expect(mockHistoryService.delete).toHaveBeenCalledWith();

      expect(mockHistoryService.delete).toHaveBeenCalledWith(1);
    });

    it('should return a ForbiddenError message', async () => {
      mockHistoryService.delete.mockImplementation(() => {
        throw new ForbiddenException()
      });

      try {
        expect(await controller.delete(1)).toThrow(ForbiddenException);
      } catch(error) {
        expect(error.message).toEqual('Forbidden');
      };
    });
  });
});
