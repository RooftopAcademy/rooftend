import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  paginate,
  Pagination,
  IPaginationOptions,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDTO } from '../entities/create-question-dto';
import STATUS from '../../statusCodes/statusCodes';
import Status from '../../statusCodes/status.interface';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) {}

  async paginateBy(
    options: IPaginationOptions,
    itemId: number,
  ): Promise<Pagination<Question>> {
    try {
      const questions = this.questionsRepository
        .createQueryBuilder('questions')
        .where(
          'questions.itemId = :itemId AND questions.answerId is not null',
          { itemId },
        )
        .leftJoinAndMapOne('questions.user', 'questions.userId', 'user')
        .leftJoinAndMapOne('questions.answer', 'questions.answerId', 'answer')
        .select(['questions.content'])
        .addSelect(['answer.content', 'answer.createdAt']);
      return await paginate<Question>(questions, options);
    } catch (err) {
      return null;
    }
  }
  async findQuestion(userId: number) {
    const questions = this.questionsRepository
      .createQueryBuilder('questions')
      .leftJoinAndMapOne('questions.user', 'questions.userId', 'user')
      .leftJoinAndMapOne('questions.item', 'questions.itemId', 'item')
      .select(['questions.content', 'questions.createdAt'])
      .where('questions.answerId is null AND item.userId = :userId', {
        userId,
      })
      .addSelect(['user.username', 'item.title'])
      .getMany();

    return questions;
  }

  async paginate(options: IPaginationOptions, user: User) {
    return paginate<Question>(this.questionsRepository, options, {
      where: { user: { id: user.id } },
    });
  }

  async paginateSent(
    options: IPaginationOptions,
    userId: number,
  ): Promise<Pagination<Question, IPaginationMeta>> {
    try {
      const questions = this.questionsRepository
        .createQueryBuilder('questions')
        .leftJoinAndMapOne('questions.item', 'questions.itemId', 'item')
        .leftJoinAndMapOne('questions.answer', 'questions.answerId', 'answer')
        .select(['questions.id', 'questions.content', 'questions.createdAt'])
        .addSelect([
          'item.title',
          'item.description',
          'item.price',
          'item.stock',
          'answer.content',
        ])
        .where('questions.userId = :userId', { userId });
      return await paginate<Question>(questions, options);
    } catch (err) {
      return null;
    }
  }

  async create(question: CreateQuestionDTO, user: User): Promise<Status> {
    try {
      const questionEntity = this.questionsRepository.create({
        ...question,
        user: user,
      });
      await this.questionsRepository.save(questionEntity);
      return STATUS.CREATED;
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }
  async delete(questionId: number): Promise<Status> {
    try {
      await this.findOneQuestion(questionId);
      await this.questionsRepository.softDelete(questionId);
      return STATUS.DELETED;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async addAnswer(
    questionId: number,
    answerId: null | number,
  ): Promise<UpdateResult> {
    try {
      return await this.questionsRepository.update(questionId, {
        answerId: answerId,
      });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOneQuestion(questionId: number) {
    const question = await this.questionsRepository.findOne(questionId);
    console.log(question);
    if (!question) {
      throw new NotFoundException();
    }
    return question;
  }

  async findUnanswered(questionId: number) {
    const question = await this.questionsRepository.findOne(questionId);
    if (!question.answerId) {
      return question;
    }
    throw new NotFoundException();
  }
}
