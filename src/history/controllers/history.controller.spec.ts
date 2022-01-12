import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CaslModule } from '../../auth/casl/casl.module';
import { User } from '../../users/entities/user.entity';
import { HistoryService } from '../services/history.service';
import { HistoryController } from './history.controller';


describe('HistoryController', () => {
  let controller: HistoryController;

  const mockHistoryService = {
    paginate: jest.fn().mockResolvedValue([
      {
        id: 1,
        user_id: 1,
        createdAt: new Date(),
      },
    ]),
    delete: jest.fn().mockImplementation(() => true),
  };

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
    let user = new User;
    user.id = 1;

    it('should return a list of history', async () => {
      expect(await controller.getAll()).toEqual([
        {
          id: 1,
          user_id: 1,
          createdAt: expect.any(Date),
        },
      ]);

      expect(mockHistoryService.paginate).toHaveBeenCalled();

      expect(mockHistoryService.paginate).toHaveBeenCalledWith({ 
        "limit": 10, 
        "page": 1, 
        "route": "/history" 
      },
      user,
      );
    });

    it('should return a ForbiddenError message', async () => {
      mockHistoryService.paginate.mockImplementationOnce(() => { throw new ForbiddenException() });

      try {
        expect(await controller.getAll()).toThrow(ForbiddenException);
      } catch(error) {
        expect(error.message).toEqual('Forbidden');
      };
    })
  });

  describe('delete', () => {
    it('should deleted history', async () => {
      expect(await controller.delete(10)).toEqual(true);

      expect.any({ 
        id: 1,
        user_id: 1,
        createdAt: expect.any(Date), 
      }),0;
    });
  });

  it('should return a ForbiddenError message', async () => {
    mockHistoryService.delete.mockImplementationOnce(() => { throw new ForbiddenException() });

    try {
      expect(await controller.delete(1)).toThrow(ForbiddenException);
    } catch(error) {
      expect(error.message).toEqual('Forbidden');
    };
  })
});
