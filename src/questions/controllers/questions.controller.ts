import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import {
  IPaginationMeta,
  Pagination
} from 'nestjs-typeorm-paginate';
import { Question } from '../entities/question.entity';
import { QuestionsService } from '../services/questions.service';
import { CreateQuestionDTO } from '../entities/create-question-dto';
import Status from '../../statusCodes/status.interface';
import STATUS from '../../statusCodes/statusCodes';
import { AnswersService } from '../services/answers.service';
import { AnswerDTO } from '../entities/answer.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private QuestionsService: QuestionsService,
    private readonly answersService: AnswersService,) { }

  @Get('/')
  @HttpCode(200)
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'limit of paginated questions',
    example: 10,
  })
  @ApiQuery({
    name: 'item_id',
    type: Number,
    required: true,
    description: 'Item id',
    example: 10,
  })
  async find(
    @Query('item_id',) item_id = 2,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta>> {
    limit = limit > 100 ? 100 : limit;
    return await this.QuestionsService.paginateBy(
      {
        page,
        limit,
        route: 'questions',
      },
      item_id,
    );
  }

  @Get('/recived')
  @HttpCode(200)
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'limit of paginated questions',
    example: 10,
  })
  async findRecived(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta>> {
    limit = limit > 100 ? 100 : limit;
    return await this.QuestionsService.paginateRecived(
      {
        page,
        limit,
        route: 'questions',
      },
      2
    );
  }

  @Get('/sent')
  @HttpCode(200)
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Current page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'limit of paginated questions',
    example: 10,
  })
  async findSent(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta> | void> {
    limit = limit > 100 ? 100 : limit;
    return await this.QuestionsService.paginateSent(
      {
        page,
        limit,
        route: 'questions',
      },
      2
    );
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create questions' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: STATUS.CREATED
    }
  })
  @ApiBody({ type: CreateQuestionDTO })
  async createQuestion(@Body() question: CreateQuestionDTO): Promise<Status> {
    return await this.QuestionsService.create(question, 2)
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete question' })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'Id of question'
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBadRequestResponse({
    description: 'Error, the deletion was not completed',
  })
  async deleteQuestion(@Param('id') id: number): Promise<Status> {
    return await this.QuestionsService.delete(id);
  }

  @Post(':id/answers')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create answer' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: STATUS.CREATED,
    }
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'Id of question'
  })
  @ApiBody({ type: AnswerDTO })
  async createAnswer(@Body() answer: AnswerDTO, @Param('id') id: number)
    : Promise<Status> {
    return await this.answersService.create(answer, id);
  }

  @Delete(':questionId/answers/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete answer' })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted',
    schema: {
      example: STATUS.DELETED,
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
  @ApiParam({
    name: 'idQ',
    example: 1,
    type: Number,
    description: 'Id of Question'
  })
  async deleteAnswer(@Param('id') id: number, @Param('questionId') questionId: number):
    Promise<Status> {
    return await this.answersService.delete(id, questionId)
  }

}
