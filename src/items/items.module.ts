import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../auth/casl/casl.module';
import { ItemsController } from './controllers/items.controller';
import { Item } from './entities/items.entity';
import { ItemsService } from './services/items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [TypeOrmModule.forFeature([Item]), CaslModule],
})
export class ItemsModule { }
