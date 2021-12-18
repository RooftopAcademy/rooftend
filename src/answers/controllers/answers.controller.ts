import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
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
    create(@Body() answer: AnswerDTO) {
        return this.answersService.create(answer);
    }
}
