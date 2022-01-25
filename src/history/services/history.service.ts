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

  delete(id: number) {
    return this.historyRepo.softDelete(id);
  }

  async paginate(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<History>> {
    return paginate<History>(this.historyRepo, options, {
      where: { user: { id: user.id } },
      relations: ['items']
    });
  }

  async findHistory(id: number): Promise<History> {
    const history = await this.historyRepo.findOne({
      select: ['id'],
      where: {
        id: id,
      },
      relations: ['user'],
    });

    return history;
  }
}
