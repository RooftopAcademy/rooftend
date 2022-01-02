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
import Status from '../../statusCodes';
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
            example: Status.CREATED,
        }
    })
    @ApiBody({ type: AnswerDTO })
    async create(@Body() answer: AnswerDTO)
        : Promise<{
            statusCode: number;
            message: string;
        }> {
        return await this.answersService.create(answer);
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Delete answer' })
    @ApiOkResponse({
        status: 200,
        description: 'Deleted',
        schema: {
            example: Status.DELETED,
        }
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
    async delete(@Param('id') id: number)
        : Promise<{
            statusCode: number;
            message: string;
        }> {
        return await this.answersService.delete(id)
    }
}
