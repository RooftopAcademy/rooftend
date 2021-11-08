import { Test, TestingModule } from '@nestjs/testing';
import { TelefonosService } from './telefonos.service';

describe('TelefonosService', () => {
  let service: TelefonosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelefonosService],
    }).compile();

    service = module.get<TelefonosService>(TelefonosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
