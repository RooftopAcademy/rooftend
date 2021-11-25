import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from '../../models/history.entity';
import { 
    IPaginationOptions, 
    paginate, 
    Pagination 
} from 'nestjs-typeorm-paginate';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) 
        private readonly historyRepo : Repository<History>,
    ){}

    getAll(): Promise<History[]> {
        return this.historyRepo.find();
    }

    getById(id: number): Promise<History> {
        return this.historyRepo.findOne(id);
    }

    create(body: any): Promise<History[]>{
        const newHistory = this.historyRepo.create(body);
        return this.historyRepo.save(newHistory);
    }

    async update(id : number, body: any): Promise<History>{
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
