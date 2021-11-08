import { Module } from '@nestjs/common';
import { PhotosController } from './controllers/photos.controller';
import { PhotosService } from './services/photos.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
