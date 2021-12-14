import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesController } from './controllers/addresses.controller';
import { Address } from './entities/address.entity';
import { AddressesService } from './services/addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AdressesModule {}
