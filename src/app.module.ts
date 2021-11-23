import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true }),
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      /*synchronize: true*/
      logging: true
    }),
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
