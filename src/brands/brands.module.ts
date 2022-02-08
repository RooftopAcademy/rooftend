import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsController } from './controllers/brands.controllers';
import { Brand } from './entities/brands.entity';
import { BrandsService } from './services/brands.serveces';

@Module({
  providers: [BrandsService],
  controllers: [BrandsController],
  imports: [TypeOrmModule.forFeature([Brand])],
  exports: [BrandsService],
})
export class BrandsModule {}
