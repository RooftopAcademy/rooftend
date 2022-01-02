import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import Status from '../../statusCodes';
import { AnswerDTO } from '../entities/answer.dto';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private answersRepository: Repository<Answer>,
        @InjectRepository(Question) private questionsRepository: Repository<Question>,
    ) { }

    async create(answer: AnswerDTO): Promise<Status> {
        try {
            const partialAnswer = this.answersRepository.create({ ...answer, 'createdAt': new Date() });
            const answerEntity = await this.answersRepository.save(partialAnswer);
            await this.questionsRepository.update(answerEntity.questionId, { 'answerId': Number(answerEntity.id) });
            return Status.CREATED
        }
        catch (err) {
            throw new UnprocessableEntityException();
        }
    }

    async delete(id: number): Promise<Status> {
        try {
            await this.answersRepository.softDelete(id);
            return Status.DELETED
        }
        catch (err) {
            throw new NotFoundException()
        }

    }

}
