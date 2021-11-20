import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { QuestionsEntity } from '../models/questions.entity';
import { Questions } from '../models/questions.interface';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionsEntity)
        private readonly questionsRepository: Repository<QuestionsEntity>
    ) { }

    async paginate(options: IPaginationOptions, item_id: number): Promise<Pagination<QuestionsEntity>> {
        const hola = paginate<QuestionsEntity>(this.questionsRepository, options)
        console.log(hola)
        return
    }

    createQuestion(question: Questions): Promise<Questions> {
        return this.questionsRepository.save(question);
    }

    findAllQuestion(): Promise<QuestionsEntity[]> {
        return this.questionsRepository.find();
    }

    deleteQuestion(id: number): Promise<DeleteResult> {
        return this.questionsRepository.delete(id);
    }

}


// async paginate(options: IPaginationOptions, item_id: number): Promise<Pagination<QuestionsEntity>> {
//     const questions = this.questionsRepository.find(item_id)
//     return paginate<QuestionsEntity>(questions, options);
// }