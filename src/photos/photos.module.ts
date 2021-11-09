import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './controllers/photos.controller';
import { PhotosEntity } from './models/photos.entity';
import { PhotosService } from './services/photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotosEntity])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
