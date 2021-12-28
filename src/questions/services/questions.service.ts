import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDTO } from '../entities/create-question-dto';


@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) { }

  async paginateBy(
    options: IPaginationOptions,
    itemId: number,
  ): Promise<Pagination<Question>> {
    try {
      let questions = this.questionsRepository.createQueryBuilder('questions')
        .where('questions.itemId = :itemId', { itemId })
        .leftJoinAndMapOne('questions.user', 'questions.userId', 'user')
        .leftJoinAndMapOne('questions.answer', 'questions.answerId', 'answer')
        .select(['questions.content'])
        .addSelect(['answer.content', 'answer.createdAt'])
        .where('questions.answerId is not null');

      return await paginate<Question>(questions, options);
    }
    catch (err) {
      throw new NotFoundException();
    }
  }

  async paginateRecived(
    options: IPaginationOptions,
    userId: number,
  ): Promise<Pagination<Question>> {
    try {
      let questions = this.questionsRepository.createQueryBuilder('questions')
        .leftJoinAndMapOne('questions.user', 'questions.userId', 'user')
        .leftJoinAndMapOne('questions.item', 'questions.itemId', 'item')
        .select(['questions.content', 'questions.createdAt'])
        .addSelect(['user.username', 'item.title'])
        .where('questions.answerId is null')
        .andWhere('item.userId = :userId', { userId })
      return await paginate<Question>(questions, options);
    }
    catch (err) {
      throw new NotFoundException();
    }
  }

  async paginateSent(
    options: IPaginationOptions,
    userId: number,
  ): Promise<Pagination<Question>> {
    try {
      let questions = this.questionsRepository.createQueryBuilder('questions')
        .leftJoinAndMapOne('questions.item', 'questions.itemId', 'item')
        .leftJoinAndMapOne('questions.answer', 'questions.answerId', 'answer')
        .select(['questions.id', 'questions.content', 'questions.createdAt'])
        .addSelect(['item.title', 'item.description', 'item.price', 'item.stock', 'answer.content'])
        .where('questions.userId = :userId', { userId })
      return await paginate<Question>(questions, options);
    }
    catch (err) {
      throw new NotFoundException();
    }
  }

  async createQuestion(question: CreateQuestionDTO, userId: number): Promise<void> {
    try {
      const questionEntity = this.questionsRepository.create({ ...question, 'userId': userId, 'createdAt': new Date() });
      await this.questionsRepository.save(questionEntity);
    }
    catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async deleteQuestion(id: number): Promise<void> {
    const deleteResponse = await this.questionsRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }
}
