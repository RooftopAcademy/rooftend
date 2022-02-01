import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate,Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CreateSavedItemDto } from '../dto/CreateSavedItemDto';
import { SavedItem } from '../entities/SavedItems.entity';

@Injectable()
export class SavedItemsService {
  constructor(
    @InjectRepository(SavedItem)
    private savedItemsRepo: Repository<SavedItem>,
  ) {}

  async getAllSavedItems(
    user: User,
    options: IPaginationOptions,
  ): Promise<Pagination<SavedItem>> {
    return paginate<SavedItem>(this.savedItemsRepo, options, {
      relations: ['user', 'item'],
    });
    // return this.savedItemsRepo.find();
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
