import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { AnswerDTO } from '../entities/answer.dto';
import { AnswersService } from '../services/answers.service';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create answer' })
    @ApiCreatedResponse({
        status: 201,
        description: 'Created',
        schema: {
            example: {
                "statusCode": 201,
                "message": "Created"
            }
        }
    })
    @ApiBody({ type: AnswerDTO })
    create(@Body() answer: AnswerDTO, userId: number) {
        return this.answersService.create(answer, userId);
    }


    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete answer' })
    @ApiResponse({
        status: 204,
        description: 'Answer was deled.',
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
    })
    @ApiBadRequestResponse({
        description: 'Error, the deletion was not completed',
    })
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.answersService.deleteAnswer(id);
    }
}
