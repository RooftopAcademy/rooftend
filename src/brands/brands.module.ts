import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands.serveces';
import { BrandsController } from './controllers/brands.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brands.entity';


@Module({
    providers: [BrandsService],
    controllers: [BrandsController],
    imports: [
        TypeOrmModule.forFeature([Brand])
    ],
})

export class BrandsModule{}