import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSavedItemDto } from '../dto/CreateSavedItemDto';
import { SavedItem } from '../entities/SavedItems.entity';

@Injectable()
export class SavedItemsService {
  constructor(
    @InjectRepository(SavedItem)
    private savedItemsRepo: Repository<SavedItem>,
  ) {}

  getAllSavedItems() {
    return this.savedItemsRepo.find();
  }
  findOneSavedItem(id: number) {
    const savedItem = this.savedItemsRepo.findOne(id, {
      relations: ['user'],
    });
    if (!savedItem) throw new NotFoundException('Saved item Not Found');

    return savedItem;
  }
  createSavedItem(createSavedItemDto: CreateSavedItemDto) {
    const newSavedItem = this.savedItemsRepo.create(createSavedItemDto);
    return this.savedItemsRepo.save(newSavedItem);
  }

  removeSavedItem(savedItem: SavedItem): Promise<DeleteResult> {
    return this.savedItemsRepo.delete(savedItem);
  }
}
