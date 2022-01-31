import { Module } from '@nestjs/common';
import { SavedItemsService } from './services/saved-items.service';
import { SavedItemsController } from './controllers/saved-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedItem } from './entities/SavedItems.entity';
import { CaslModule } from '../auth/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([SavedItem]), CaslModule],
  providers: [SavedItemsService],
  controllers: [SavedItemsController],
})
export class SavedItemsModule { }
