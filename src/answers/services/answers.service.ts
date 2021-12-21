import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AnswerDTO } from '../entities/answer.dto';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private AnswersRepository: Repository<Answer>,
    ) { }

    async create(answer: AnswerDTO): Promise<void> {
        try {
            const answerEntity = this.AnswersRepository.create({ ...answer, 'createdAt': new Date() });
            await this.AnswersRepository.save(answerEntity)
        }
        catch (err) {
            throw new UnprocessableEntityException();
        }
    }

    async deleteAnswer(id: number): Promise<void> {
        const deleteResponse = await this.AnswersRepository.softDelete(id);
        if (!deleteResponse.affected) {
            throw new NotFoundException();
        }
    }
}
