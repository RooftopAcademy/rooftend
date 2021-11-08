import { Test, TestingModule } from '@nestjs/testing';
import { TelefonosController } from './phones.controller';

describe('TelefonosController', () => {
  let controller: TelefonosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelefonosController],
    }).compile();

    controller = module.get<TelefonosController>(TelefonosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
