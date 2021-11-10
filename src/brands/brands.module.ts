import { Module } from '@nestjs/common';
import { brandsService } from './services/brands.serveces';
import { brandsController } from './controllers/brands.controllers';

@Module({
    providers: [brandsService],
    controllers: [brandsController]
})

export class brandsModule{}