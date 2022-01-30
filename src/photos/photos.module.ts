import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './controllers/photos.controller';
import { Photos } from './models/photos.entity';
import { CaslModule } from '../auth/casl/casl.module';
import { PhotosService } from './services/photos.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [TypeOrmModule.forFeature([Photos]), CaslModule],
})
export class PhotosModule {}
