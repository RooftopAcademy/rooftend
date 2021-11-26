import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresController } from './controller/stores.controller';
import { StoresService } from './controller/stores.service';
import { StoresEntity } from './models/stores.entity';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [TypeOrmModule.forFeature([StoresEntity])],
})
export class StoresModule {}
