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
} from '@nestjs/swagger';
import { SupportCategory } from '../entities/supportCategory.entity';
import { CreateRequestDto } from '../entities/create-request.dto';
import { User } from '../../users/entities/user.entity';

@ApiTags('Support')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) { }

  @ApiOperation({ summary: 'Returns all support categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array with all available Support Categories',
    type: [SupportCategory],
  })
  @Get('categories')
  async getAllCategories() {
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
  @ApiParam({ name: 'id', type: Number, required: true, example: 3 })
  @HttpCode(200)
  @Get('categories/:id')
  async getQuestionsByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return await this.supportService.getQuestionsByCategoryId(id);
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
  async getAnswerByQuestionId(@Param('id', ParseIntPipe) id: number) {
    return await this.supportService.getAnswerByQuestionId(id);
  }

  @ApiOperation({
    summary: 'Creates a new support request to ask a question',
  })
  @ApiCreatedResponse({
    description: 'Created a new support request',
    schema: {
      example: {
        statusCode: 201,
        message: 'Created',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: {
        statusCode: 400,
        message: ['property user should not exist'],
        error: 'Bad Request',
      },
    },
  })
  @ApiBody({ type: CreateRequestDto })
  @HttpCode(201)
  @Post('request')
  async makeARequest(@Body() createRequestDto: CreateRequestDto) {
    // User will be retrieved from a JWT in the future
    const user = new User();
    user.id = 1;
    return this.supportService.makeARequest(createRequestDto, user);
  }
}
