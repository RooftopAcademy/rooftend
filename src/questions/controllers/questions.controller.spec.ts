import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller'
import { QuestionsService } from '../services/questions.service'
import Status from '../../statusCodes';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateQuestionDTO } from '../entities/create-question-dto';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Question } from '../entities/question.entity';

describe('QuestionController test', () => {
    let controllerQuestions: QuestionsController

    const mockQuestionsService = {
        create: jest.fn().mockImplementation((questionDto: CreateQuestionDTO, id: number) => {
            return Status.CREATED
        }),
        delete: jest.fn().mockImplementation(id => {
            return Status.DELETED
        }),
        paginateBy: jest.fn().mockImplementation((options, itemId) => {
            return Promise.resolve(
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
        }),
        paginateRecived: jest.fn().mockImplementation((options, userId) => {
            return Promise.resolve(
                [
                    {
                        "content": "Soft kitty, little kitty song?",
                        "createdAt": "2021-12-27T18:19:14.893Z",
                        "user": {
                            "username": "CatOwner1",
                        },
                        "item": {
                            "title": "Balls of wool",
                        }
                    },
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
        }),
        paginateSent: jest.fn().mockImplementation((options, userId) => {
            return Promise.resolve(
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
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuestionsController],
            providers: [QuestionsService],
        })
            .overrideProvider(QuestionsService)
            .useValue(mockQuestionsService)
            .compile()

        controllerQuestions = module.get<QuestionsController>(QuestionsController);
    });

    it('should be defined', () => {
        expect(controllerQuestions).toBeDefined();
    });

    it('should be defined', () => {
        expect(mockQuestionsService).toBeDefined();
    });

    describe('create method test', () => {
        const questionDto = {} as unknown as CreateQuestionDTO

        it('should recive created status', async () => {
            expect(await controllerQuestions.create(questionDto)).toEqual(Status.CREATED)
            expect(mockQuestionsService.create).toHaveBeenCalled();
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockQuestionsService, 'create')
                .mockImplementationOnce(() => {
                    throw new UnprocessableEntityException();
                })
            try {
                await controllerQuestions.create(questionDto)
            }
            catch (err) {
                expect(err).toEqual(new UnprocessableEntityException())
            }
        })
    })

    describe('soft delete', () => {
        it('should delete the question with 200', async () => {
            const questionId: number = 1
            expect(await controllerQuestions.delete(questionId)).toEqual(Status.DELETED)
            expect(mockQuestionsService.create).toHaveBeenCalled()
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockQuestionsService, 'delete')
                .mockImplementationOnce(() => {
                    throw new NotFoundException();
                })
            try {
                await controllerQuestions.delete(3)
            }
            catch (err) {
                expect(err).toEqual(new NotFoundException())
            }
        })
    })

    describe('find method', () => {
        it('should get all questions answerd of publication with item id 1', async () => {
            expect(await controllerQuestions.find(1, 1, 1)).toEqual(
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
            expect(mockQuestionsService.paginateBy).toHaveBeenCalled()
        })
        it('should return null', async () => {
            jest.spyOn(mockQuestionsService, 'paginateBy')
                .mockImplementationOnce(() => {
                    return null;
                })
            expect(await controllerQuestions.find(1, 1, 10)).toEqual(null)
        })

    })

    describe('findRecived method', () => {
        it('should get all questions that user with id 2 recived', async () => {
            expect(await controllerQuestions.findRecived(1, 10)).toEqual(
                [
                    {
                        "content": "Soft kitty, little kitty song?",
                        "createdAt": "2021-12-27T18:19:14.893Z",
                        "user": {
                            "username": "CatOwner1",
                        },
                        "item": {
                            "title": "Balls of wool",
                        }
                    },
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
            expect(mockQuestionsService.paginateBy).toHaveBeenCalled()
        })
        it('should return null', async () => {
            jest.spyOn(mockQuestionsService, 'paginateRecived')
                .mockImplementationOnce(() => {
                    return null;
                })
            expect(await controllerQuestions.findRecived(1, 10)).toEqual(null)
        })

    })
    describe('findSent method', () => {
        it('should get all questions wrote by the user', async () => {
            expect(await controllerQuestions.findSent(1, 10)).toEqual(
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
            expect(mockQuestionsService.paginateBy).toHaveBeenCalled()
        })
        it('should return null', async () => {
            jest.spyOn(mockQuestionsService, 'paginateSent')
                .mockImplementationOnce(() => {
                    return null;
                })
            expect(await controllerQuestions.findSent(1, 10)).toEqual(null)
        })

    })
});
