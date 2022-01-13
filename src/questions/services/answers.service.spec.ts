
import { HttpException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import STATUS from "../../statusCodes/statusCodes"
import { AnswerDTO } from "../entities/answer.dto";
import { Answer } from "../entities/answer.entity";
import { AnswersService } from "./answers.service";
import { QuestionsService } from "./questions.service";
import { QuestionsController } from "../controllers/questions.controller";
import { Question } from "../entities/question.entity";



describe('AnswersService test', () => {
    let answersRepository: Repository<Answer>
    let questionsService: QuestionsService
    let answersService: AnswersService
    let questionsRepository: Repository<Question>
    const ANSWER_REPOSITORY_TOKEN = getRepositoryToken(Answer);
    const mockPartialEntity = {
        content: 'content example',
        createdAt: new Date(),
        questionId: 12
    }
    const QUESTION_REPOSITORY_TOKEN = getRepositoryToken(Question);

    let mockAnswersRepository = {
        create: jest.fn((answer, questionId) => { return mockPartialEntity }),
        save: jest.fn().mockImplementation(answer => {
            return Promise.resolve({
                ...answer,
                deleledAt: null,
                id: Date.now()
            })
        }),
        softDelete: jest.fn().mockImplementation((id) =>
            Promise.resolve({
                id,
            }),
        ),
    }

    const mockQuestionsService = {
        findUnanswered: jest.fn((questionId) => { }),
        addAnswer: jest.fn((questionId, answerEntity) => { })
    }
    let mockQuestionsRepository = {
        update: jest
            .fn()
            .mockImplementation((questionId, x) => Promise.resolve({ ...x }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnswersService,
                {
                    provide: ANSWER_REPOSITORY_TOKEN,
                    useValue: mockAnswersRepository,
                },
                QuestionsService,
            ],
        }).overrideProvider(QuestionsService)
            .useValue(mockQuestionsService)
            .compile()

        answersService = module.get<AnswersService>(AnswersService);
        answersRepository = module.get<Repository<Answer>>(ANSWER_REPOSITORY_TOKEN)

    });

    it('should be defined what', () => {
        expect(answersService).toBeDefined();
    });

    it('should be defined', () => {
        expect(answersRepository).toBeDefined();
    });


    describe('test for create method', () => {
        const mockAnswer = {} as unknown as AnswerDTO
        const questionId = 1;
        it('Should create a answer ', async () => {

            const questionId = 1;
            expect(await answersService.create(mockAnswer, questionId)).toEqual(STATUS.CREATED)
            expect(mockAnswersRepository.create).toHaveBeenCalled()
            expect(mockAnswersRepository.save).toHaveBeenCalledWith(mockPartialEntity)

        });

        it('should throw an UnprocessableEntityException', async () => {

            jest.spyOn(mockAnswersRepository, 'save')
                .mockImplementationOnce(() => {
                    throw HttpException;
                })
            try {
                await answersService.create(mockAnswer, questionId)
            }
            catch (err) {
                expect(err).toEqual(new UnprocessableEntityException())
            }

        })

    })

    describe('test for delete method', () => {
        it('should apply a soft delete on answer with 200', async () => {
            expect(await answersService.delete(3, 2)).toEqual({
                "statusCode": 200,
                "message": "Deleted",
            });
        })
        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockAnswersRepository, 'softDelete')
                .mockImplementationOnce(() => {
                    throw HttpException;
                })
            try {
                await answersService.delete(3, 2)
            }
            catch (err) {
                expect(err).toEqual(new NotFoundException())
            }
        })
    })
})

