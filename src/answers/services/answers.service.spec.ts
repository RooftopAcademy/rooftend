
import { HttpException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "../../questions/entities/question.entity";
import { AnswerDTO } from "../entities/answer.dto";
import { Answer } from "../entities/answer.entity";
import { AnswersService } from "./answers.service";



describe('AnswersService test', () => {
    let answersRepository: Repository<Answer>
    let questionsRepository: Repository<Question>
    let service: AnswersService;
    const QUESTION_REPOSITORY_TOKEN = getRepositoryToken(Question);
    const ANSWER_REPOSITORY_TOKEN = getRepositoryToken(Answer);
    const mockPartialEntity = {
        content: 'content example',
        createdAt: new Date(),
        questionId: 12
    }

    let mockQuestionsRepository = {
        update: jest
            .fn()
            .mockImplementation((questionId, x) => Promise.resolve({ ...x }))
    }
    let mockAnswersRepository = {
        create: jest.fn(answer => { return mockPartialEntity }),
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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnswersService,
                {
                    provide: ANSWER_REPOSITORY_TOKEN,
                    useValue: mockAnswersRepository,
                },
                {
                    provide: QUESTION_REPOSITORY_TOKEN,
                    useValue: mockQuestionsRepository,
                }
            ],
        }).compile();

        service = module.get<AnswersService>(AnswersService);
        answersRepository = module.get<Repository<Answer>>(ANSWER_REPOSITORY_TOKEN)
        questionsRepository = module.get<Repository<Question>>(QUESTION_REPOSITORY_TOKEN)
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be defined', () => {
        expect(answersRepository).toBeDefined();
    });
    it('should be defined', () => {
        expect(questionsRepository).toBeDefined();
    });

    describe('test for create method', () => {

        it('Should create a answer ', async () => {
            const answer: AnswerDTO = {
                content: 'Mighty Answer',
                questionId: 11,
            }
            expect(await service.create(answer)).toEqual({
                "statusCode": 201,
                "message": "Created",
            })
            expect(mockAnswersRepository.create).toHaveBeenCalled()
            expect(mockAnswersRepository.save).toHaveBeenCalledWith(mockPartialEntity)
            expect(mockQuestionsRepository.update).toBeCalled()
        });

        it('should throw an UnprocessableEntityException', async () => {
            const mockAnswer = {} as unknown as AnswerDTO
            jest.spyOn(mockAnswersRepository, 'save')
                .mockImplementationOnce(() => {
                    throw HttpException;
                })
            try {
                await service.create(mockAnswer)
            }
            catch (err) {
                expect(err).toEqual(new UnprocessableEntityException())
            }

        })

    })

    describe('test for delete method', () => {
        it('should apply a soft delete on answer with 200', async () => {
            expect(await service.delete(3)).toEqual({
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
                await service.delete(3)
            }
            catch (err) {
                expect(err).toEqual(new NotFoundException())
            }
        })
    })
})

