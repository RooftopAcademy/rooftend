import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { AnswerDTO } from '../entities/answer.dto';
import { Answer } from '../entities/answer.entity';
@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private answersRepository: Repository<Answer>,
        @InjectRepository(Question) private questionsRepository: Repository<Question>,
    ) { }

    async create(answer: AnswerDTO): Promise<void> {
        try {
            const partialAnswer = this.answersRepository.create({ ...answer, 'createdAt': new Date() });
            const answerEntity = await this.answersRepository.save(partialAnswer);
            await this.saveAnswer(answer.questionId, Number(answerEntity.id));
        }
        catch (err) {
            throw new UnprocessableEntityException();
        }
    }

    async saveAnswer(questionId: number, answerId: number): Promise<void> {
        const updateResponse = await this.questionsRepository.update(questionId, { 'answerId': answerId });
        if (!updateResponse.affected) {
            throw new NotFoundException();
        }
    }

    async deleteAnswer(id: number): Promise<void> {
        const deleteResponse = await this.answersRepository.softDelete(id);
        if (!deleteResponse.affected) {
            throw new NotFoundException();
        }
    }

}
