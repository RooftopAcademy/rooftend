import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from './answers.controller'
import { AnswersService } from '../services/answers.service'
import { AnswerDTO } from '../entities/answer.dto';
import Status from '../../statusCodes';
import { HttpException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

describe('AnswersController', () => {
    let controller: AnswersController

    const mockAnswersService = {
        create: jest.fn().mockImplementation(answerDto => {
            return Status.CREATED
        }),
        delete: jest.fn().mockImplementation(id => {
            return Status.DELETED
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnswersController],
            providers: [AnswersService],
        })
            .overrideProvider(AnswersService)
            .useValue(mockAnswersService)
            .compile()

        controller = module.get<AnswersController>(AnswersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be defined', () => {
        expect(mockAnswersService).toBeDefined();
    });

    describe('create method test', () => {
        const answerDto: AnswerDTO = {
            "content": "Answer to some question",
            "questionId": 1,
        };

        it('should recive created status', async () => {
            const answerDto: AnswerDTO = {
                "content": "Answer to some question",
                "questionId": 1,
            };
            expect(await controller.create(answerDto)).toEqual(Status.CREATED)
            expect(mockAnswersService.create).toHaveBeenCalled();
            expect(mockAnswersService.create).toBeCalledWith(answerDto)
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockAnswersService, 'create')
                .mockImplementationOnce(() => {
                    throw new UnprocessableEntityException();
                })
            try {
                await controller.create(answerDto)
            }
            catch (err) {
                expect(err).toEqual(new UnprocessableEntityException())
            }
        })
    })

    describe('soft delete', () => {
        it('should delete the answer', async () => {
            const answerId: number = 1
            expect(await controller.delete(answerId)).toEqual(Status.DELETED)
            expect(mockAnswersService.create).toHaveBeenCalled()
        })

        it('should throw a NotFoundException', async () => {
            jest.spyOn(mockAnswersService, 'delete')
                .mockImplementationOnce(() => {
                    throw new NotFoundException();
                })
            try {
                await controller.delete(3)
            }
            catch (err) {
                expect(err).toEqual(new NotFoundException())
            }
        })
    })

});
