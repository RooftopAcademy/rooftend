import { Test, TestingModule } from '@nestjs/testing';
import { CaslModule } from '../../../auth/casl/casl.module';
import { HistoryService } from '../../services/history/history.service';
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
    it('should return a list of history', async () => {
      expect(await controller.getAll()).toEqual([
        {
          id: 1,
          user_id: 1,
          createdAt: expect.any(Date),
        },
      ]);

      expect(mockHistoryService.paginate).toHaveBeenCalled();

      expect(mockHistoryService.paginate).toHaveBeenCalledWith({"limit": 10, "page": 1, "route": "/history"});
    });
  });
});
