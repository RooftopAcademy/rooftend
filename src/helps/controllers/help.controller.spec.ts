import { Test, TestingModule } from '@nestjs/testing';
import { HelpService } from '../services/help.service';
import { HelpController } from './help.controller';

describe('HelpController', () => {
  let controller: HelpController;

  const mockHelpService = {
    findAllHelpCategories: jest.fn(() => {
      return [
        {
        "ID": expect.any(Number),
        "Category": expect.any(String)
        },
      ]
    }),
    findAnswerToQuestion: jest.fn((id) => {
      return {
        "Question": expect.any(String),
        "Answer": expect.any(String)
      }
    }),
    findAllQuestionsByCategoryId: jest.fn((id) => {
      return [
        {
          "ID": expect.any(Number),
          "Question": expect.any(String)
        },
      ]
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpController],
      providers: [HelpService]
    })
    .overrideProvider(HelpService)
    .useValue(mockHelpService)
    .compile();

    controller = module.get<HelpController>(HelpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all help categories', () => {
    expect(controller.findAllHelpCategories()).toEqual([
      {
        "ID": expect.any(Number), 
        "Category": expect.any(String)
      },
    ])

    expect(mockHelpService.findAllHelpCategories).toHaveBeenCalled();
  })

  it('should return the answer to a question', () => {
    expect(controller.findAnswerToQuestion(1)).toEqual({
      "Question": expect.any(String),
      "Answer": expect.any(String)
    })
  })

  it('should bring all questions from the referred category_id', () => {
    expect(controller.findAllQuestionsByCategoryId(1)).toEqual([
      {
        "ID": expect.any(Number),
        "Question": expect.any(String)
      },
    ])
  })
});
