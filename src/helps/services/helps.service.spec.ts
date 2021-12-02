import { Test, TestingModule } from '@nestjs/testing';
import { HelpsService } from './helps.service';

describe('HelpsService', () => {
  let service: HelpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpsService],
    }).compile();

    service = module.get<HelpsService>(HelpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
