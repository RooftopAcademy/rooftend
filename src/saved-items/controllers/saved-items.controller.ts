import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { SavedItemsEntity } from '../entities/savedItems.entity';
import { SavedItemsService } from '../services/saved-items.service';

@Controller('saved')
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @Get()
  findAll(): Promise<SavedItemsEntity[]> {
    return this.savedItemsService.getAllSavedItems();
  }

  @Post()
  create(@Body() savedItems: SavedItemsEntity): Promise<SavedItemsEntity> {
    return this.savedItemsService.createSavedItem(savedItems);
  }

  @Patch(':id')
  update(@Body() savedItems: SavedItemsEntity): Promise<SavedItemsEntity> {
    return this.savedItemsService.updateSavedItem(savedItems);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.savedItemsService.removeSavedItem(id);
  }
}
