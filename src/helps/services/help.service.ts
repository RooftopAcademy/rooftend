import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../categories/categories.entity';
import { QuestionsEntity } from '../../questions/models/questions.entity';
import { Help } from '../help.entity';

@Injectable()
export class HelpService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionRepository: Repository<QuestionsEntity>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * Brings all categories referred to the help section.
   */
  findAllHelpCategories(): Promise<Category[]> {
    const categories = this.categoryRepository.createQueryBuilder("category")
      .select("category.id", "ID")
      .addSelect("category.name", "Category")
      .innerJoin(Help, "help", "category.id = help.categoryId")
      .getRawMany();

    return categories;
  }

  /**
   * Brings all questions from the referred category_id.
   */
  findAllQuestionsByCategoryId(id: number): Promise<QuestionsEntity[]> {
    const questions = this.questionRepository
      .createQueryBuilder("question")
      .select("question.questionContent", "Question")
      .addSelect("question.id", "ID")
      .innerJoin(Category, "category", "category.id = question.helpId")
      .where("category.id = :id", { id })
      .getRawMany();

    return questions;
  }

  /**
   * Brings the answer and the question from a certain question id.
   * It checks that the question to be brought belongs to the help section.
   */
  findAnswerToQuestion(id: number): Promise<QuestionsEntity> {
    const answer = this.questionRepository
      .createQueryBuilder("question")
      .select("question.questionContent", "Question")
      .addSelect("question.answer", "Answer")
      .where("question.id = :id", { id })
      .andWhere("question.helpId IS NOT NULL")
      .getRawOne();

    return answer;
  }
}
