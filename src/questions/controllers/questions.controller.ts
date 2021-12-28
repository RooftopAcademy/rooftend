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
  Res,
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
import { Response } from 'express';
import { Question } from '../entities/question.entity';
import { QuestionsService } from '../services/questions.service';
import { CreateQuestionDTO } from '../entities/create-question-dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private QuestionsService: QuestionsService) { }

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
    @Res() res: Response,
    @Query('item_id',) item_id = 2,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta> | void> {
    limit = limit > 100 ? 100 : limit;
    const paginatedQuestions = await this.QuestionsService.paginateBy(
      {
        page,
        limit,
        route: 'questions',
      },
      item_id,
    );
    if (paginatedQuestions)
      return res.status(200).send(paginatedQuestions).end();
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
    @Res() res: Response,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta> | void> {
    limit = limit > 100 ? 100 : limit;
    const paginatedQuestions = await this.QuestionsService.paginateRecived(
      {
        page,
        limit,
        route: 'questions',
      },
      2
    );
    if (paginatedQuestions)
      return res.status(200).send(paginatedQuestions).end();
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
    @Res() res: Response,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta> | void> {
    limit = limit > 100 ? 100 : limit;
    const paginatedQuestions = await this.QuestionsService.paginateSent(
      {
        page,
        limit,
        route: 'questions',
      },
      2
    );
    if (paginatedQuestions)
      return res.status(200).send(paginatedQuestions).end();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create questions' })
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
  @ApiBody({ type: CreateQuestionDTO })
  async create(@Body() question: CreateQuestionDTO, @Res() res: Response) {
    await this.QuestionsService.createQuestion(question, 2);
    return res.send(
      {
        "statusCode": 201,
        "message": "Created",
      }
    );
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
  async delete(@Param('id') id: number, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
    await this.QuestionsService.deleteQuestion(id);
    return res.send(
      {
        "statusCode": 200,
        "message": "Deleted",
      }
    );
  }
}
