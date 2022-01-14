import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from '../services/brands.serveces';
import { BrandsController } from './brands.controllers';

describe('brandsController', () => {
  let controller: BrandsController;

  const mockBrandService = {
    paginate: jest.fn().mockImplementation(() => {
      return [
        {
          items: [
            {
              id: 1,
              name: 'nike',
              photoUrl:
                'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
            },
            {
              id: 2,
              name: 'adidas',
              photoUrl:
                'https://logos-marcas.com/wp-content/uploads/2020/04/Adidas-Logo.png',
            },
          ],
        },
      ];
    }),
    findOne: jest.fn().mockImplementation(() => {
      return {
        id: 1,
        name: 'nike',
        photoUrl:
          'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [BrandsService],
    })
      .overrideProvider(BrandsService)
      .useValue(mockBrandService)
      .compile();

    controller = module.get<BrandsController>(BrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('paginate', () =>{
    it('Should return a list of brands', async () =>{
      expect(await controller.index()).toEqual([
        {
          items: [
            {
              id: 1,
              name: 'nike',
              photoUrl:
                'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
            },
            {
              id: 2,
              name: 'adidas',
              photoUrl:
                'https://logos-marcas.com/wp-content/uploads/2020/04/Adidas-Logo.png',
            },
          ],
        },
      ]);
    });
  });
  describe('findOne', () => {
    it('should return a brand by its id', async () => {
      expect(await controller.findOne(1)).toEqual({
        id: 1,
        name: 'nike',
        photoUrl:
          'https://logos-marcas.com/wp-content/uploads/2020/04/Nike-Logo.png',
      });
      expect(mockBrandService.findOne).toHaveBeenCalled();
      expect(mockBrandService.findOne).toHaveBeenCalledWith(1);
    });
  });
});
