import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportCategory } from '../entities/supportCategory.entity';
import { SupportQuestion } from '../entities/supportQuestion.entity';
import { SupportRequest } from '../entities/supportRequest.entity';
import { CreateRequestDto } from '../entities/create-request.dto';
import { AnswerRequestDto } from '../entities/answer-request.dto';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportCategory)
    private readonly categoryRepository: Repository<SupportCategory>,
    @InjectRepository(SupportQuestion)
    private readonly questionRepository: Repository<SupportQuestion>,
    @InjectRepository(SupportRequest)
    private readonly requestRepository: Repository<SupportRequest>,
  ) {}

  /**
   * Returns all SupportCategories
   */
  async getAllCategories(): Promise<SupportCategory[]> {
    return await this.categoryRepository.find();
  }

  /**
   * Returns all questions from a specific category
   */
  async getAllQuestionsByCategoryId(id: number | string) {
    const questions = await this.questionRepository
      .createQueryBuilder('questions')
      .select('questions.id', 'id')
      .addSelect('questions.content', 'question')
      .where('questions.category = :id', { id })
      .getRawMany();

    console.log(questions);
    if (questions.length > 0) {
      return questions;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  /**
   * Finds the answer to a question
   * @param {number} id
   */
  async getAnswerByQuestionId(id: number): Promise<SupportQuestion> {
    const answer = await this.questionRepository.findOne({
      select: ['id', 'answer'],
      where: {
        id: id,
      },
    });

    if (answer) {
      return answer;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  /**
   * A standard user can create a request for support
   * @param {CreateRequestDto} request
   * @returns {Promise<SupportRequest>}
   */
  async makeARequest(
    request: CreateRequestDto,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const req = await this.requestRepository.save(request);
      if (req) {
        return { statusCode: 200, message: 'Created' };
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * An employee from support can answer a user request.
   * This method first checks that the user request exists,
   * then it checks that the question hasn't been answered, otherwise an error is thrown.
   * @param { CreateRequestDto } answer
   * @returns { Promise<SupportRequest> }
   */
  async answerARequest(answer: AnswerRequestDto): Promise<SupportRequest> {
    const question = await this.requestRepository.findOne({
      where: { id: answer.replyTo, replyTo: null },
    });
    const answered = await this.requestRepository.findOne({
      where: { replyTo: answer.replyTo },
    });

    console.log(question, answered);
    if (question && answered === undefined) {
      const answerReq = <SupportRequest>(
        (<unknown>this.requestRepository.save(answer))
      );
      return answerReq;
    }
    throw question
      ? new HttpException('Not found', HttpStatus.NOT_FOUND)
      : new HttpException('Invalid entity', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
