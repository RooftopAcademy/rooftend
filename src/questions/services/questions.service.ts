import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Question } from '../entities/question.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { QuestionDTO } from '../entities/question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) { }

  async paginateBy(
    relation: 'user' | 'item',
    options: IPaginationOptions,
    itemOrUserId: number,
  ): Promise<Pagination<Question>> {
    return await paginate<Question>(this.questionsRepository, options, {
      relations: [relation],
      order: { createdAt: 'DESC' },
      where: { relation: itemOrUserId },
    });
  }

  createQuestion(question: QuestionDTO, userId: number): Promise<Question> {
    const questionEntity = this.questionsRepository.create({ ...question, "userId": userId });
    return this.questionsRepository.save(questionEntity);
  }

  async deleteQuestion(id: number): Promise<UpdateResult> {
    const deleteResponse = await this.questionsRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(id, 'Error, the deletion was not completed');
    }
    return deleteResponse;
  }
}
