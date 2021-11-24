import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from 'src/history/models/history.entity';

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
}
