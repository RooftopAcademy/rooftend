import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from '../services/stores.service';
import { StoresController } from './stores.controller';

describe('StoresController', () => {
  let controller: StoresController;
  const mockStoresService = {
    paginate: jest.fn().mockImplementation(() => {
      return [
        {
          items: [
            {
              id: '1',
              brand: {
                id: '1',
                name: 'Asus',
                photoUrl: 'http://dummyimage.com/100x100.png/dddddd/000000',
              },
            },
            {
              id: '2',
              brand: {
                id: '5',
                name: 'Xioami',
                photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
              },
            },
          ],
        },
      ];
    }),
    getOne: jest.fn().mockImplementation((id) => {
      return {
        id,
        brand: {
          id: '5',
          name: 'Xioami',
          photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        },
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [StoresService],
    })
      .overrideProvider(StoresService)
      .useValue(mockStoresService)
      .compile();

    controller = module.get<StoresController>(StoresController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('paginate', () => {
    it('should return a list of stores', async () => {
      expect(await controller.getAll()).toEqual([
        {
          items: [
            {
              id: '1',
              brand: {
                id: '1',
                name: 'Asus',
                photoUrl: 'http://dummyimage.com/100x100.png/dddddd/000000',
              },
            },
            {
              id: '2',
              brand: {
                id: '5',
                name: 'Xioami',
                photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
              },
            },
          ],
        },
      ]);
    });
  });
  describe('getOne', () => {
    it('Should return a store by its id', async () => {
      expect(await controller.getOne(2)).toEqual({
        id: 2,
        brand: {
          id: '5',
          name: 'Xioami',
          photoUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        },
      });
      expect(mockStoresService.getOne).toHaveBeenCalled();
      expect(mockStoresService.getOne).toHaveBeenCalledWith(2);
    });
  });
});
