import { SupportService } from '../services/support.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { SupportCategory } from '../entities/supportCategory.entity';
import { SupportQuestion } from '../entities/supportQuestion.entity';
import { SupportRequest } from '../entities/supportRequest.entity';
import { CreateRequestDto } from '../entities/create-request.dto';
import { AnswerRequestDto } from '../entities/answer-request.dto';

@ApiTags('Support')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @ApiOperation({ summary: 'Returns all support categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array with all available Support Categories',
    type: [SupportCategory],
  })
  @Get('categories')
  async findAllCategories() {
    return await this.supportService.getAllCategories();
  }

  @ApiOperation({ summary: 'Returns all questions from a certain category' })
  @ApiNotFoundResponse({
    description: 'Id not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Not found',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The param was not a numeric string',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of SupportQuestion belonging to a certain category',
    schema: {
      example: [
        {
          id: 1,
          question:
            "What's he minimum amount of purchases I have to make to upgrade my account?",
        },
      ],
    },
  })
  @ApiParam({ name: 'id', type: Number, required: true })
  @HttpCode(200)
  @Get('categories/:id')
  async getAllQuestionsByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return await this.supportService.getAllQuestionsByCategoryId(id);
  }

  @ApiOperation({ summary: 'Returns the answer to a specific question' })
  @ApiResponse({
    status: 200,
    description: 'Returns the answer to a specific question',
    schema: {
      example: {
        id: 1,
        answer: 'There are many ways to address this inconvinient...',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The param was not a numeric string',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Id not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Not found',
      },
    },
  })
  @ApiParam({ name: 'id', type: Number, required: true })
  @HttpCode(200)
  @Get('question/:id')
  async getAnswerByQuestionId(@Param('id') id: number) {
    return await this.supportService.getAnswerByQuestionId(id);
  }

  @ApiOperation({
    summary: 'Creates a new support request to ask or answer a question',
  })
  @ApiCreatedResponse({
    type: SupportRequest,
    description: 'Created a new support request',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'property user should not exist',
          'user_id must be an integer number',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiBody({ type: CreateRequestDto })
  @HttpCode(201)
  @Post('request')
  async makeARequest(@Body() createRequestDto: CreateRequestDto) {
    return this.supportService.makeARequest(createRequestDto);
  }

  @ApiOperation({
    summary: 'Creates a new support request to answer a question',
  })
  @ApiCreatedResponse({
    type: SupportRequest,
    description: 'Created a new support request as an answer',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Trying to answer an already answered question',
    schema: {
      example: {
        asd: '',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'property user should not exist',
          'user_id must be an integer number',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiBody({ type: AnswerRequestDto })
  @HttpCode(201)
  @Post('request/answer')
  async answerARequest(@Body() answerRequestDto: AnswerRequestDto) {
    return this.supportService.answerARequest(answerRequestDto);
  }
}
