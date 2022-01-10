import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportCategory } from '../entities/supportCategory.entity';
import { SupportQuestion } from '../entities/supportQuestion.entity';
import { SupportRequest } from '../entities/supportRequest.entity';
import { CreateRequestDto } from '../entities/create-request.dto';
import { User } from '../../users/entities/user.entity';

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
  async getQuestionsByCategoryId(id: number | string) {
    const questions = await this.questionRepository
      .createQueryBuilder('questions')
      .select('questions.id', 'id')
      .addSelect('questions.content', 'question')
      .where('questions.category = :id', { id })
      .getRawMany();

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
    user: User,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const req = await this.requestRepository.save({
        ...request,
        user: user,
      });
      if (req) {
        return { statusCode: 200, message: 'Created' };
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
