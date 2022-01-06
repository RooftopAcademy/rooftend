import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import STATUS from '../../statusCodes/statusCodes';
import Status from '../../statusCodes/status.interface'
import { AnswerDTO } from '../entities/answer.dto';
import { Answer } from '../entities/answer.entity';
import { QuestionsService } from './questions.service';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private answersRepository: Repository<Answer>,
        private questionsService: QuestionsService
    ) { }

    async create(answer: AnswerDTO, questionId: number) {
        try {

            await this.questionsService.findUnanswered(questionId)
            const partialAnswer = this.answersRepository.create({ ...answer, 'createdAt': new Date() });
            const answerEntity = await this.answersRepository.save(partialAnswer);
            await this.questionsService.addAnswer(questionId, answerEntity.id)
            return STATUS.CREATED

        }
        catch (err) {
            throw new UnprocessableEntityException();
        }
    }

    async delete(answerId: number, questionId: number): Promise<Status> {
        try {
            await this.answersRepository.softDelete(answerId);
            await this.questionsService.addAnswer(questionId, null)
            return STATUS.DELETED
        }
        catch (err) {
            throw new NotFoundException()
        }
    }

}
