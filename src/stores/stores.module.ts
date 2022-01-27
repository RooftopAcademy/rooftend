import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresController } from './controllers/stores.controller';
import { StoresService } from './services/stores.service';
import { Store } from './entities/stores.entity';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [TypeOrmModule.forFeature([Store])],
})
export class StoresModule {}
