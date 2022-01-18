import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { History } from '../models/history.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,
  ) {}

  async delete(id: number): Promise<boolean> {
    await this.historyRepo.delete(id);
    
    return true;
  };

  async paginate(options: IPaginationOptions, user: User): Promise<Pagination<History>> {
    return paginate<History>(this.historyRepo, options, { where: { user: { id: user.id } } });
  };

  async findHistory(userId: number): Promise<History> {
    const history = await this.historyRepo.findOne({
      select: ['id'], where: { purchasedAt: null , user:{ id:userId }, relations: ['user'], order: { id: 'DESC' } },
    });

    return history;
  };
}
