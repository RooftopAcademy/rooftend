import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private AnswersRepository: Repository<Answer>,
    ) { }

    create(answer: Answer): Promise<Answer> {
        return this.AnswersRepository.save(answer);
    }
}
