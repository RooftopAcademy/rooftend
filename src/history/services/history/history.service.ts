import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
<<<<<<< HEAD
import { History } from '../../models/history.entity';
import { 
    IPaginationOptions, 
    paginate, 
    Pagination 
=======
import {
  IPaginationOptions,
  paginate,
  Pagination,
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e
} from 'nestjs-typeorm-paginate';
import { History } from '../../models/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,
  ) {}

  getAll(): Promise<History[]> {
    return this.historyRepo.find();
  }

  getById(id: number): Promise<History> {
    return this.historyRepo.findOne(id);
  }

  create(body: any): Promise<History[]> {
    const newHistory = this.historyRepo.create(body);
    return this.historyRepo.save(newHistory);
  }

  async update(id: number, body: any): Promise<History> {
    const history = await this.historyRepo.findOne(id);
    this.historyRepo.merge(history, body);
    return this.historyRepo.save(history);
  }

  async delete(id: number): Promise<boolean> {
    await this.historyRepo.delete(id);
    return true;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<History>> {
    return paginate<History>(this.historyRepo, options);
  }
}
