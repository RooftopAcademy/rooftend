import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from '../models/history.entity';

import { PhotosEntity } from '../../photos/models/photos.entity';
import STATUS from '../../statusCodes/statusCodes';
import Status from '../../statusCodes/status.interface';
import { CreateHistoryDto } from '../models/create-history.dto';

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
    .select('history.created_at')
    .addSelect(['items.title', 'brand.name', 'items.price', 'photos.url'])
    .where('history.user_id = :user',{ user })
    .groupBy('history.created_at')
    .addGroupBy('items.title')
    .addGroupBy('items.price')
    .addGroupBy('photos.url')
    .addGroupBy('brand.id')
    .orderBy('history.created_at', "DESC")
    .limit(50)
    .getRawMany()

    return historyRaw;
  }

  async create( createHistoryDto: CreateHistoryDto, user: number): Promise<Status> {
    try {
      const visit = { ...createHistoryDto, user_id: user };
      const historyEntity = this.historyRepo.create(visit);
      await this.historyRepo.save(historyEntity);
      return STATUS.CREATED
    }
    catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async delete(visitId: number): Promise<Status> {
    try {
      await this.findOneById(visitId)
      await this.historyRepo.softDelete(visitId)
      return STATUS.DELETED
      
    }
    catch (err) {
      throw new NotFoundException();
    }
  }

  async findOneById(id: number): Promise<History> {
    const visit = await this.historyRepo.findOne(id);

    if (!visit) {
      throw new NotFoundException('History not found');
    }

    return visit;
  }


}
