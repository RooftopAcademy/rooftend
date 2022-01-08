import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller'
import { QuestionsService } from '../services/questions.service'
import STATUS from '../../statusCodes/statusCodes';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateQuestionDTO } from '../entities/create-question-dto';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Question } from '../entities/question.entity';
import { AnswersService } from '../services/answers.service';
import { AnswerDTO } from '../entities/answer.dto';

describe('QuestionController test', () => {
    let controller: QuestionsController

    const mockAnswersService = {
        create: jest.fn().mockImplementation(answerDto => {
            return STATUS.CREATED
        }),

        delete: jest.fn().mockImplementation(id => {
            return STATUS.DELETED
        })
    }

    const mockQuestionsService = {
        create: jest.fn().mockImplementation((questionDto: CreateQuestionDTO, id: number) => {
            return STATUS.CREATED
        }),
        delete: jest.fn().mockImplementation(id => {
            return STATUS.DELETED
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
            providers: [QuestionsService, AnswersService],
        })
            .overrideProvider(AnswersService)
            .useValue(mockAnswersService)
            .overrideProvider(QuestionsService)
            .useValue(mockQuestionsService)
            .compile()

        controller = module.get<QuestionsController>(QuestionsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be defined', () => {
        expect(mockAnswersService).toBeDefined();
    });

    it('should be defined', () => {
        expect(mockQuestionsService).toBeDefined();
    });

    describe('create method test', () => {
        const questionDto = {} as unknown as CreateQuestionDTO

        it('should recive created status', async () => {
            expect(await controller.createQuestion(questionDto)).toEqual(STATUS.CREATED)
            expect(mockQuestionsService.create).toHaveBeenCalled();
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockQuestionsService, 'create')
                .mockImplementationOnce(() => {
                    throw new UnprocessableEntityException();
                })
            try {
                await controller.createQuestion(questionDto)
            }
            catch (err) {
                expect(err).toEqual(new UnprocessableEntityException())
            }
        })
    })

    describe('soft delete', () => {
        it('should delete the question with 200', async () => {
            const questionId: number = 1
            expect(await controller.deleteQuestion(questionId)).toEqual(STATUS.DELETED)
            expect(mockQuestionsService.create).toHaveBeenCalled()
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockQuestionsService, 'delete')
                .mockImplementationOnce(() => {
                    throw new NotFoundException();
                })
            try {
                await controller.deleteQuestion(3)
            }
            catch (err) {
                expect(err).toEqual(new NotFoundException())
            }
        })
    })

    describe('find method', () => {
        it('should get all questions answerd of publication with item id 1', async () => {
            expect(await controller.find(1, 1, 1)).toEqual(
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
            expect(await controller.find(1, 1, 10)).toEqual(null)
        })

    })

    describe('findRecived method', () => {
        it('should get all questions that user with id 2 recived', async () => {
            expect(await controller.findRecived(1, 10)).toEqual(
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
            expect(await controller.findRecived(1, 10)).toEqual(null)
        })

    })
    describe('findSent method', () => {
        it('should get all questions wrote by the user', async () => {
            expect(await controller.findSent(1, 10)).toEqual(
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
            expect(await controller.findSent(1, 10)).toEqual(null)
        })

    })


    describe('create method test', () => {
        const answerDto: AnswerDTO = {
            "content": "Answer to some question",
        }
        const id: number = 1
        it('should recive created status', async () => {
            expect(await controller.createAnswer(answerDto, id)).toEqual(STATUS.CREATED)
            expect(mockAnswersService.create).toHaveBeenCalled();
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockAnswersService, 'create')
                .mockImplementationOnce(() => {
                    throw new UnprocessableEntityException();
                })
            try {
                await controller.createAnswer(answerDto, id)
            }
            catch (err) {
                expect(err).toEqual(new UnprocessableEntityException())
            }
        })
    })

    describe('soft delete', () => {
        const answerId: number = 1
        const questionId: number = 1
        it('should delete the answer', async () => {

            expect(await controller.deleteAnswer(answerId, questionId)).toEqual(STATUS.DELETED)
            expect(mockAnswersService.create).toHaveBeenCalled()
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockAnswersService, 'delete')
                .mockImplementationOnce(() => {
                    throw new NotFoundException();
                })
            try {
                await controller.deleteAnswer(answerId, questionId)
            }
            catch (err) {
                expect(err).toEqual(new NotFoundException())
            }
        })
    })

});
