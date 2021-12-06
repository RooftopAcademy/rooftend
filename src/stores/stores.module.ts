import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresController } from './controllers/stores.controller';
import { StoresService } from './controllers/stores.service';
import { Store } from './models/stores.entity';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [TypeOrmModule.forFeature([Store])],
})
export class StoresModule {}
