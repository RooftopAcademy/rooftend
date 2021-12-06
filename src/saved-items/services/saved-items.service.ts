import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedItemsEntity } from '../entities/savedItems.entity';

@Injectable()
export class SavedItemsService {
  constructor(
    @InjectRepository(SavedItemsEntity)
    private savedItemsRepo: Repository<SavedItemsEntity>,
  ) {}

  getAllSavedItems() {
    return this.savedItemsRepo.find();
  }

  createSavedItem(savedItem: SavedItemsEntity) {
    return this.savedItemsRepo.save(savedItem);
  }

  updateSavedItem(savedItem: SavedItemsEntity) {
    return this.savedItemsRepo.save(savedItem);
  }

  removeSavedItem(id: number) {
    return this.savedItemsRepo.delete(id);
  }
}
