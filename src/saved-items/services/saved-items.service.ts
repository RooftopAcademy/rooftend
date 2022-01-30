import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSavedItemDto } from '../dto/CreateSavedItemDto';
import { SavedItemsEntity } from '../entities/SavedItems.entity';

@Injectable()
export class SavedItemsService {
  constructor(
    @InjectRepository(SavedItemsEntity)
    private savedItemsRepo: Repository<SavedItemsEntity>,
  ) {}

  getAllSavedItems() {
    return this.savedItemsRepo.find();
  }

  createSavedItem(createSavedItemDto: CreateSavedItemDto) {
    const newSavedItem = this.savedItemsRepo.create(createSavedItemDto);
    return this.savedItemsRepo.save(newSavedItem);
  }

  removeSavedItem(id: number) {
    return this.savedItemsRepo.delete(id);
  }
}
