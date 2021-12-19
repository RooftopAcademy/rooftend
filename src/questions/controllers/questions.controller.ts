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
import { DeleteResult } from 'typeorm';
import { Response } from 'express';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Question } from '../entities/question.entity';
import { QuestionsService } from '../services/questions.service';
import { QuestionDTO } from '../entities/question.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('Questions')
export class QuestionsController {
  constructor(private QuestionsService: QuestionsService) { }

  @Get('item/:item_id')
  async findQuestionsWithItem(
    @Param('item_id') item_id: number,
    @Res() res: Response,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta> | void> {
    limit = limit > 100 ? 100 : limit;
    const paginatedQuestions = await this.QuestionsService.paginateBy(
      'item',
      {
        page,
        limit,
        route: 'questions',
      },
      item_id,
    );
    if (paginatedQuestions)
      return res.status(200).send(paginatedQuestions).end();
    return res.status(404).end('Error! Questions Not Found');
  }

  @Get('user/:user_id')
  async findQuestionsWithuser(
    @Param('user_id') user_id: number,
    @Res() res: Response,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta> | void> {
    limit = limit > 100 ? 100 : limit;
    const paginatedQuestions = await this.QuestionsService.paginateBy(
      'user',
      {
        page,
        limit,
        route: 'questions',
      },
      user_id,
    );

    if (paginatedQuestions)
      return res.status(200).send(paginatedQuestions).end();
    return res.status(404).end('Error! Questions Not Found');
  }

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
  @ApiBody({ type: QuestionDTO })
  create(@Body() question: QuestionDTO, userId: 1): Promise<Question> {
    return this.QuestionsService.createQuestion(question, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({
    status: 204,
    description: 'Question has been deleted successfully.',
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
    return await this.QuestionsService.deleteQuestion(id);
  }
}
