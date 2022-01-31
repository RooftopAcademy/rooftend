import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../auth/casl/casl.module';
import { AddressesController } from './controllers/addresses.controller';
import { Address } from './entities/address.entity';
import { AddressesService } from './services/addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), CaslModule],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AdressesModule {}
