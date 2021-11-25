import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './controllers/photos.controller';
import { PhotosEntity } from './models/photos.entity';
import { PhotosService } from './services/photos.service';
import { PhotosRepository } from './repositories/photos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhotosEntity, PhotosRepository])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
