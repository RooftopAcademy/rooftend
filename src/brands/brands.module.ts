import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsController } from './controllers/brands.controllers';
import { Brand } from './entities/brands.entity';
import { BrandsService } from './services/brands.service';

@Module({
  providers: [BrandsService],
  controllers: [BrandsController],
  imports: [TypeOrmModule.forFeature([Brand])],
})
export class BrandsModule {}
