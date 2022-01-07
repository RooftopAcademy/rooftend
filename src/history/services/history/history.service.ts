import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { History } from '../../models/history.entity';
import { Item } from '../../../items/entities/items.entity'
import { QueryBuilder } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { HistoryModule } from '../../history.module';
import { PhotosEntity } from '../../../photos/models/photos.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,
  ) {}

  get(user : number) {

    const historyRaw = this.historyRepo.createQueryBuilder('history')
    .leftJoinAndMapOne('history.item', 'history.item_id', 'items')
    .leftJoinAndMapOne(
      'items.photos',
      PhotosEntity,
      'photos',
      'items.id = photos.subject_id and photos.subject_type = :item',
      {item: 'item'}
      )
    .leftJoinAndMapOne('items.brand', 'items.brandId', 'brand')
    .select(`TO_CHAR( history.created_at , 'YYYY Month')`, 'date')
    .addSelect(['items.title', 'brand.name', 'items.price', 'photos.url'])
    .where('history.user_id = :user',{ user })
    .groupBy('date')
    .addGroupBy('history.created_at')
    .addGroupBy('items.title')
    .addGroupBy('items.price')
    .addGroupBy('photos.url')
    .addGroupBy('brand.id')
    .orderBy('history.created_at', "DESC")
    .limit(50)
    .getRawMany()

    return historyRaw;
  }


  async delete(id: number): Promise<boolean> {
    await this.historyRepo.delete(id);
    return true;
  }


}
