import { Module } from '@nestjs/common';
import { PhonesService } from './services/phones.service';
import { PhonesController } from './controllers/phones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [PhonesService],
  controllers: [PhonesController],
})
export class PhonesModule {}
