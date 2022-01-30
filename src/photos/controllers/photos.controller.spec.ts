import { Test, TestingModule } from '@nestjs/testing';
import { CaslModule } from '../../auth/casl/casl.module';
import { PhotosService } from '../services/photos.service';
import { PhotosController } from './photos.controller';

describe('PhotosController', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [PhotosService],
      imports: [CaslModule],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
