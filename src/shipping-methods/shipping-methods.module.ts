import { Module } from '@nestjs/common';
import { ShippingMethodsService } from './services/shipping-methods.service';
import { ShippingMethodsController } from './controllers/shipping-methods.controller';
//import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([ShippingMethod])
  // ],
  providers: [ShippingMethodsService],
  controllers: [ShippingMethodsController],
})
export class ShippingMethodsModule {}
