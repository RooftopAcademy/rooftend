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
              id: 1,
              username: 'miUsuario',
              brand: 'Xiaomi',
            },
            {
              id: 2,
              username: 'miUsuario',
              brand: 'Nike',
            },
          ],
        },
      ];
    }),
    getOne: jest.fn().mockImplementation((id) => {
      return {
        id: 1,
        username: 'miUsuario',
        brand: 'Xiaomi',
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
              id: 1,
              username: 'miUsuario',
              brand: 'Xiaomi',
            },
            {
              id: 2,
              username: 'miUsuario',
              brand: 'Nike',
            },
          ],
        },
      ]);
    });
  });
  describe('getOne', () => {
    it('Should return a store by its id', async () => {
      expect(await controller.getOne(1)).toEqual({
        id: 1,
        username: 'miUsuario',
        brand: 'Xiaomi',
      });
      expect(mockStoresService.getOne).toHaveBeenCalled();
      expect(mockStoresService.getOne).toHaveBeenCalledWith(1);
    });
  });
});
