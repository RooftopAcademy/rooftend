import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerDTO } from '../entities/answer.dto';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private AnswersRepository: Repository<Answer>,
    ) { }

    create(answer: AnswerDTO): Promise<Answer> {
        const answerEntity = this.AnswersRepository.create({ ...answer, "userId": 1 });
        return this.AnswersRepository.save(answerEntity);
    }
}
