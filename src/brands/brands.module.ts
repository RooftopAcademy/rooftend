import { Module } from '@nestjs/common';
import { brandsService } from './services/brands.serveces';
import { brandsController } from './controllers/brands.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brands.entity';


@Module({
    providers: [brandsService],
    controllers: [brandsController],
    imports: [
        TypeOrmModule.forFeature([Brand])
    ],
})

export class brandsModule{}