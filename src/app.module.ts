import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShippingMethodsModule } from './shipping-methods/shipping-methods.module';

@Module({
  imports: [ShippingMethodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
