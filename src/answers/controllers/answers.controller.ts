import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { AnswerDTO } from '../entities/answer.dto';
import { AnswersService } from '../services/answers.service';

@ApiTags('Answers')
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
                "status": 201,
                "message": "Created",
            }
        }
    })
    @ApiBody({ type: AnswerDTO })
    async create(@Body() answer: AnswerDTO) {
        await this.answersService.create(answer, 1);
        return ({
            "status": 201,
            "message": "Created",
        });
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete answer' })
    @ApiResponse({
        status: 200,
        description: 'Ok',
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Id of answer'
    })
    @ApiBadRequestResponse({
        description: 'Error, the deletion was not completed',
    })
    async delete(@Param('id') id: number): Promise<{ status: number, message: string }> {
        await this.answersService.deleteAnswer(id)
        return ({
            "status": 200,
            "message": "Ok",
        });
    }
}
