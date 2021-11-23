import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { QuestionsEntity } from '../models/questions.entity';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionsEntity)
        private readonly questionsRepository: Repository<QuestionsEntity>
    ) { }

    async paginateBy(relation: 'user' | 'item', options: IPaginationOptions, itemOrUserId: number): Promise<Pagination<QuestionsEntity>> {

        return await paginate<QuestionsEntity>(
            this.questionsRepository,
            options,
            {
                relations: [relation],
                order: { created_at: "DESC" },
                where: { relation: itemOrUserId }
            }
        )
    }


    createQuestion(question: QuestionsEntity): Promise<QuestionsEntity> {
        return this.questionsRepository.save(question);
    }


    deleteQuestion(id: number): Promise<DeleteResult> {
        return this.questionsRepository.delete(id);
    }

}


// async paginate(options: IPaginationOptions, item_id: number): Promise<Pagination<QuestionsEntity>> {
//     const questions = this.questionsRepository.find(item_id)
//     return paginate<QuestionsEntity>(questions, options);
// }