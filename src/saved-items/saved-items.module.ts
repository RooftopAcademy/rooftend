import { Module } from '@nestjs/common';
import { SavedItemsService } from './services/saved-items.service';
import { SavedItemsController } from './controllers/saved-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedItemsEntity } from './entities/savedItems.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavedItemsEntity])],
  providers: [SavedItemsService],
  controllers: [SavedItemsController],
})
export class SavedItemsModule {}
