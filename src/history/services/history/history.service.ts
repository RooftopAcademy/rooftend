import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { History } from '../../models/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,
  ) {}

  async getAll(userId): Promise<History[]> {
    return await this.historyRepo.find({
      where: {
        userId,
      },
    });
  }

  async delete(id: number): Promise<boolean> {
    await this.historyRepo.delete(id);
    return true;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<History>> {
    return paginate<History>(this.historyRepo, options);
  }
}
