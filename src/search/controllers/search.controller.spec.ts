import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from '../services/search.service';
import { SearchController } from './search.controller';

describe('SearchController', () => {
  let controller: SearchController;

  const mockService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService],
    })
      .overrideProvider(SearchService)
      .useValue(mockService)
      .compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service', () => {
    controller.findAll('televisor');
    expect(mockService.findAll).toBeCalled();
    expect(mockService.findAll).toBeCalledWith('televisor');
  });
});
