import { Test, TestingModule } from '@nestjs/testing';
import { HelpsController } from './helps.controller';

describe('HelpsController', () => {
  let controller: HelpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpsController],
    }).compile();

    controller = module.get<HelpsController>(HelpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
