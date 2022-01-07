import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { CreateRequestDto } from '../entities/create-request.dto';
import { SupportCategory } from '../entities/supportCategory.entity';
import { SupportQuestion } from '../entities/supportQuestion.entity';
import { SupportRequest } from '../entities/supportRequest.entity';
import { SupportService } from './support.service';

describe('SupportService', () => {
  let service: SupportService;

  const mockCategoriesRepo = {
    find: jest.fn().mockReturnValue([
      {
        id: 1,
        name: 'Admistrate and cancel purchases',
        excerpt: 'Pay, track shipments, modify, complain or cancel purchases',
      },
    ]),
  };

  const mockQuestionsRepo = {
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnValue([
        {
          id: 1,
          question:
            "What's he minimum amount of purchases I have to make to upgrade my account?",
        },
      ]),
    }),
    findOne: jest.fn().mockReturnValue({
      id: 1,
      answer: 'There are many ways...',
    }),
  };

  const mockRequestsRepo = {
    save: jest.fn((req: CreateRequestDto, user: User) => {
      return { statusCode: 200, message: 'Created' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportService,
        {
          provide: getRepositoryToken(SupportCategory),
          useValue: mockCategoriesRepo,
        },
        {
          provide: getRepositoryToken(SupportQuestion),
          useValue: mockQuestionsRepo,
        },
        {
          provide: getRepositoryToken(SupportRequest),
          useValue: mockRequestsRepo,
        },
      ],
    }).compile();

    service = module.get<SupportService>(SupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should bring all support categories', async () => {
    expect(await service.getAllCategories()).toEqual([
      {
        id: expect.any(Number),
        name: expect.any(String),
        excerpt: expect.any(String),
      },
    ]);
    expect(mockCategoriesRepo.find).toBeCalled();
  });
  it('should return all questions from a specific category', async () => {
    expect(await service.getQuestionsByCategoryId(1)).toEqual([
      {
        id: 1,
        question:
          "What's he minimum amount of purchases I have to make to upgrade my account?",
      },
    ]);
    expect(mockQuestionsRepo.createQueryBuilder).toBeCalledTimes(1);
  });
  it('should find the answer to a question', async () => {
    expect(await service.getAnswerByQuestionId(1)).toEqual({
      id: expect.any(Number),
      answer: expect.any(String),
    });
    expect(mockQuestionsRepo.findOne).toBeCalledTimes(1);
  });

  it('should create a support request', async () => {
    const request: CreateRequestDto = {
      content: 'How to unsubscribe from the weekly newsletters?',
    };
    const user = new User();
    expect(await service.makeARequest(request, user)).toEqual({
      statusCode: 200,
      message: 'Created',
    });
    expect(mockRequestsRepo.save).toHaveBeenCalledTimes(1);
  });
});
