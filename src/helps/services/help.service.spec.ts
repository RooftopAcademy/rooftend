import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../../categories/categories.entity';
import { Question } from '../../questions/entities/question.entity';
import { HelpService } from './help.service';

describe('HelpService', () => {
  let service: HelpService;

  const categories = [
    {
      "ID": expect.any(Number),
      "Category": expect.any(String)
    },
  ];

  const questions = [
    {
      "ID": expect.any(Number),
      "Question": expect.any(String)
    },
  ];

  const answer = {
    "Question": expect.any(String),
    "Answer": expect.any(String)
  }

  const mockCategoryRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnValueOnce(categories)
    }))
  }

  const mockQuestionRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnValueOnce(questions),
      getRawOne: jest.fn().mockReturnValueOnce(answer),
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HelpService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository
        },
        {
          provide: getRepositoryToken(Question),
          useValue: mockQuestionRepository
        }
      ],
    }).compile();

    service = module.get<HelpService>(HelpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should bring all categories referred to the help section', () => {
    expect(service.findAllHelpCategories()).toEqual(categories)
  })

  it('should return all questions about a certain category', () => {
    expect(service.findAllQuestionsByCategoryId(1)).toEqual(questions)
  })

  it('should return the answer along with the question, searched by question id', () => {
    expect(service.findAnswerToQuestion(1)).toEqual(answer)
  })
});
