import { HttpException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQuestionDTO } from "../entities/create-question-dto";
import { Question } from "../entities/question.entity";
import { QuestionsService } from "./questions.service";
import { Pagination } from "nestjs-typeorm-paginate";

import *  as typeOrmPaginate from 'nestjs-typeorm-paginate/dist/paginate'
import { AnswerDTO } from "../entities/answer.dto";
import STATUS from "../../statusCodes/statusCodes";



describe('QuestionsService test', () => {



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
        createQueryBuilder: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnThis(),
            leftJoinAndMapOne: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),

        })
    }

    const mockPaginates = jest.spyOn(typeOrmPaginate, 'paginate')


    let questionsRepository: Repository<Question>

    let service: QuestionsService;

    const QUESTION_REPOSITORY_TOKEN = getRepositoryToken(Question);

    const mockEntity = {
        content: 'content example',
        ItemId: 12,
        UserId: 1,
        createdAt: new Date(),
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

    describe('test for find method', () => {
        it('should get questions with answers in item publications', async () => {
            mockPaginates.mockImplementationOnce((queryBuilder, options) => {
                const result = Promise.resolve([
                    {
                        "content": "Cats, cats, cats... Can u see them?",
                        "answer":
                        {
                            "content": "They are everywhere!",
                            "createdAt": "2021-12-27T20:06:45.424Z"
                        }
                    },
                    {
                        "content": "THE CAT IS UNDER THE TABLE!?",
                        "answer":
                        {
                            "content": "At the moment, yes...",
                            "createdAt": "2021-12-27T20:06:53.314Z"
                        }
                    },
                ]) as unknown as Promise<Pagination<unknown, unknown>>
                return result
            })

            expect(await service.paginateBy({ page: 1, limit: 10 }, 1)).toEqual(
                [
                    {
                        "content": "Cats, cats, cats... Can u see them?",
                        "answer":
                        {
                            "content": "They are everywhere!",
                            "createdAt": "2021-12-27T20:06:45.424Z"
                        }
                    },
                    {
                        "content": "THE CAT IS UNDER THE TABLE!?",
                        "answer":
                        {
                            "content": "At the moment, yes...",
                            "createdAt": "2021-12-27T20:06:53.314Z"
                        }
                    },
                ]
            )
            expect(mockQuestionsRepository.createQueryBuilder).toHaveBeenCalled()

        })
        it('should return null', async () => {
            mockPaginates.mockImplementationOnce((queryBuilder, options) => {
                throw HttpException;
            })
            expect(await service.paginateBy({ page: 1, limit: 10 }, 1)).toEqual(null)
            expect(mockQuestionsRepository.createQueryBuilder).toHaveBeenCalled()
        })

    })
    describe('test for findRecived method', () => {
        it('should get questions not answered', async () => {
            mockPaginates.mockImplementationOnce((queryBuilder, options) => {
                const result = Promise.resolve(
                    [
                        {
                            "content": "Are you allergic to cats?",
                            "createdAt": "2021-12-27T18:23:59.363Z",
                            "user": {
                                "username": "CatOwner2",
                            },
                            "item": {
                                "title": "Candies for your cats :3",
                            }
                        },
                    ]) as unknown as Promise<Pagination<unknown, unknown>>
                return result
            })
            expect(await service.paginateRecived({ page: 1, limit: 10 }, 1)).toEqual(
                [
                    {
                        "content": "Are you allergic to cats?",
                        "createdAt": "2021-12-27T18:23:59.363Z",
                        "user": {
                            "username": "CatOwner2",
                        },
                        "item": {
                            "title": "Candies for your cats :3",
                        }
                    },
                ]
            )
            expect(mockQuestionsRepository.createQueryBuilder).toHaveBeenCalled()

        })
        it('should return null', async () => {
            mockPaginates.mockImplementationOnce((queryBuilder, options) => {
                throw HttpException;
            })
            expect(await service.paginateRecived({ page: 1, limit: 10 }, 1)).toEqual(null)
            expect(mockQuestionsRepository.createQueryBuilder).toHaveBeenCalled()

        })
    })

    describe('test for findSent method', () => {
        it('should get questions sents, with or witout answer', async () => {
            mockPaginates.mockImplementationOnce((queryBuilder, options) => {
                const result = Promise.resolve(
                    [
                        {
                            "id": "14",
                            "content": "Why you did you said that cats are not included? Batman has a cat?",
                            "createdAt": "2021-12-27T18:23:59.363Z",
                            "item": {
                                "title": "Batman toy, cats are not included",
                                "description": "Dieta a base de platanos",
                                "price": 1872,
                                "stock": 21
                            },
                            "answer": null
                        },
                        {
                            "id": "4",
                            "content": "Do you have one of Catwoman?",
                            "createdAt": "2021-12-27T18:20:42.255Z",
                            "item": {
                                "title": "Batman toy, cats are not included",
                                "description": "DC character",
                                "price": 1872,
                                "stock": 21
                            },
                            "answer": {
                                "content": "Search my others publiCATions, maybe in cat toys CATegory"
                            }
                        },
                    ]
                ) as unknown as Promise<Pagination<unknown, unknown>>
                return result
            })
            expect(await service.paginateSent({ page: 1, limit: 10 }, 1)).toEqual(
                [
                    {
                        "id": "14",
                        "content": "Why you did you said that cats are not included? Batman has a cat?",
                        "createdAt": "2021-12-27T18:23:59.363Z",
                        "item": {
                            "title": "Batman toy, cats are not included",
                            "description": "Dieta a base de platanos",
                            "price": 1872,
                            "stock": 21
                        },
                        "answer": null
                    },
                    {
                        "id": "4",
                        "content": "Do you have one of Catwoman?",
                        "createdAt": "2021-12-27T18:20:42.255Z",
                        "item": {
                            "title": "Batman toy, cats are not included",
                            "description": "DC character",
                            "price": 1872,
                            "stock": 21
                        },
                        "answer": {
                            "content": "Search my others publiCATions, maybe in cat toys CATegory"
                        }
                    },
                ]
            )
            expect(mockQuestionsRepository.createQueryBuilder).toHaveBeenCalled()

        })
        it('should return null', async () => {
            mockPaginates.mockImplementationOnce((queryBuilder, options) => {
                throw HttpException;
            })
            expect(await service.paginateSent({ page: 1, limit: 10 }, 1)).toEqual(null)
            expect(mockQuestionsRepository.createQueryBuilder).toHaveBeenCalled()

        })
    })

})
