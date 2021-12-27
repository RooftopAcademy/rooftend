import {
    Body,
    Controller,
    Delete,
    HttpCode,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { Response } from 'express';
import { AnswerDTO } from '../entities/answer.dto';
import { AnswersService } from '../services/answers.service';

@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
    constructor(
        private readonly answersService: AnswersService,
    ) { }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create answer' })
    @ApiCreatedResponse({
        status: 201,
        description: 'Created',
        schema: {
            example: {
                "statusCode": 201,
                "message": "Created",
            }
        }
    })
    @ApiBody({ type: AnswerDTO })
    async create(
        @Body() answer: AnswerDTO,
        @Res() res: Response
    ): Promise<Response<any, Record<string, any>>> {
        await this.answersService.create(answer);
        return res.send(
            {
                "statusCode": 201,
                "message": "Created",
            }
        );
    }
    @Delete(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete answer' })
    @ApiOkResponse({
        status: 200,
        description: 'Deleted',
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Id of answer'
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Not found',
    })
    async delete(@Param('id') id: number, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
        await this.answersService.deleteAnswer(id)
        return res.send(
            {
                "statusCode": 200,
                "message": "Deleted",
            }
        );
    }
}
