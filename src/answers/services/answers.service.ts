import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AnswerDTO } from '../entities/answer.dto';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private AnswersRepository: Repository<Answer>,
    ) { }

    create(answer: AnswerDTO, userId: number): Promise<Answer> {
        const answerEntity = this.AnswersRepository.create({ ...answer, "userId": userId });
        return this.AnswersRepository.save(answerEntity);
    }

    async deleteAnswer(id: number): Promise<UpdateResult> {
        const deleteResponse = await this.AnswersRepository.softDelete(id);
        if (!deleteResponse.affected) {
            throw new NotFoundException(id, 'Error, the deletion was not completed');
        }
        return deleteResponse;
    }
}
