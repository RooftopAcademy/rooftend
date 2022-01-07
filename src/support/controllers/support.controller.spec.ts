import { Test, TestingModule } from '@nestjs/testing';
import { CreateRequestDto } from '../entities/create-request.dto';
import { SupportService } from '../services/support.service';
import { SupportController } from './support.controller';

describe('SupportController', () => {
  let controller: SupportController;

  const makeRequestDto = {
    content: 'How to unsubscribe from news from MeLi?',
  };

  const categories = [
    {
      id: 1,
      name: 'Admistrate and cancel purchases',
      excerpt: 'Pay, track shipments, modify, complain or cancel purchases',
    },
  ];

  const questions = [
    {
      id: 1,
      question:
        "What's he minimum amount of purchases I have to make to upgrade my account?",
    },
  ];

  const mockService = {
    getAllCategories: jest.fn(() => {
      return categories;
    }),
    getQuestionsByCategoryId: jest.fn((id: number) => {
      return questions;
    }),
    getAnswerByQuestionId: jest.fn((id: number) => {
      return {
        id: 1,
        answer: 'There are many ways to address this inconvinient...',
      };
    }),
    makeARequest: jest.fn((dto: CreateRequestDto) => {
      return {
        statusCode: expect.any(Number),
        message: expect.any(String),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportController],
      providers: [SupportService],
    })
      .overrideProvider(SupportService)
      .useValue(mockService)
      .compile();

    controller = module.get<SupportController>(SupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retrieve all support categories', async () => {
    expect(await controller.getAllCategories()).toEqual(categories);
  });

  it('should return all questions from a certain category', async () => {
    expect(await controller.getQuestionsByCategoryId(1)).toEqual(questions);
  });

  it('should return the answer to a question', async () => {
    expect(await controller.getAnswerByQuestionId(1)).toEqual({
      id: expect.any(Number),
      answer: expect.any(String),
    });
  });

  it('should create a new support request to ask a question', async () => {
    expect(await controller.makeARequest(makeRequestDto)).toEqual({
      statusCode: 201,
      message: 'Created',
    });
    expect(mockService.makeARequest).toBeCalledTimes(1);
  });
});
