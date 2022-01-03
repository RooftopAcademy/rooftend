import { HttpException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQuestionDTO } from "../entities/create-question-dto";
import { Question } from "../entities/question.entity";
import { QuestionsService } from "./questions.service";

describe('QuestionsService test', () => {

    let questionsRepository: Repository<Question>
    let service: QuestionsService;
    const QUESTION_REPOSITORY_TOKEN = getRepositoryToken(Question);
    const mockEntity = {
        content: 'content example',
        ItemId: 12,
        UserId: 1,
        createdAt: new Date(),
    }

    let mockQuestionsRepository = {
        create: jest.fn((question, userId) => { return mockEntity }),
        save: jest.fn().mockImplementation(question => {
            Promise.resolve({
                ...question,
                deleledAt: null,
                answerId: null,
                id: Date.now(),
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
                QuestionsService,
                {
                    provide: QUESTION_REPOSITORY_TOKEN,
                    useValue: mockQuestionsRepository,
                }
            ],
        }).compile();

        service = module.get<QuestionsService>(QuestionsService);

        questionsRepository = module.get<Repository<Question>>(QUESTION_REPOSITORY_TOKEN)
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be defined', () => {
        expect(questionsRepository).toBeDefined();
    });

    describe('test for create method', () => {

        it('Should create a question ', async () => {
            const question: CreateQuestionDTO = {
                content: 'Mocked cats are awesome, dont u think?',
                itemId: 11,
            }
            expect(await service.create(question, 1)).toEqual({
                "statusCode": 201,
                "message": "Created",
            })
            expect(mockQuestionsRepository.create).toHaveBeenCalled()
            expect(mockQuestionsRepository.save).toHaveBeenCalled()
        });

        it('should throw an UnprocessableEntityException', async () => {
            const question = {} as unknown as CreateQuestionDTO
            jest.spyOn(mockQuestionsRepository, 'save')
                .mockImplementationOnce(() => {
                    throw HttpException;
                })
            try {
                await service.create(question, 1)
            }
            catch (err) {
                expect(err).toEqual(new UnprocessableEntityException())
            }

        })

    })

    describe('test for delete method', () => {
        it('should apply a soft delete on question with 200', async () => {
            expect(await service.delete(3)).toEqual({
                "statusCode": 200,
                "message": "Deleted",
            });
        })
        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockQuestionsRepository, 'softDelete')
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
