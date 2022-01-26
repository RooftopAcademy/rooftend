import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Question } from '../entities/question.entity';
import { QuestionsService } from '../services/questions.service';
import { CreateQuestionDTO } from '../entities/create-question-dto';
import Status from '../../statusCodes/status.interface';
import STATUS from '../../statusCodes/statusCodes';
import { AnswersService } from '../services/answers.service';
import { AnswerDTO } from '../entities/answer.dto';
import { User } from '../../users/entities/user.entity';
import { Public } from '../../authentication/decorators/public.decorator';
import { Request } from 'express';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(
    private questionsService: QuestionsService,
    private readonly answersService: AnswersService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @ApiOperation({ summary: 'Get all questions answered of corresponding item' })
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
  @Get('/')
  @Public()
  async find(
    @Query('item_id') item_id,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta>> {
    limit = limit > 100 ? 100 : limit;
    return await this.questionsService.paginateBy(
      {
        page,
        limit,
        route: 'questions',
      },
      item_id,
    );
  }
  @Get('/received')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
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
  async findReceived(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const user: User = <User>req.user;
    limit = limit > 100 ? 100 : limit;
    const questionReceived: any = await this.questionsService.findQuestion(
      user.id,
    );
    const ability = this.caslAbilityFactory.createForUser(user);
    if (
      ability.cannot(Permission.Read, subject('Question', questionReceived))
    ) {
      throw new ForbiddenException();
    }
    return await this.questionsService.paginate(
      {
        page,
        limit,
        route: '/questions',
      },
      user,
    );
  }

  @ApiOperation({ summary: 'get questions sent by user' })
  @HttpCode(200)
  @ApiBearerAuth()
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
  @Get('/sent')
  async findSent(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Question, IPaginationMeta> | void> {
    limit = limit > 100 ? 100 : limit;
    return await this.questionsService.paginateSent(
      {
        page,
        limit,
        route: 'questions',
      },
      2,
    );
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create questions' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: STATUS.CREATED,
    },
  })
  @ApiBody({ type: CreateQuestionDTO })
  async createQuestion(
    @Req() req: Request,
    @Body() question: CreateQuestionDTO,
  ): Promise<Status> {
    const user = new User();
    user.id = 1;
    return await this.questionsService.create(question, user);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete question' })
  @ApiOkResponse({
    status: 200,
    description: 'Deleted',
  })
  @ApiParam({
    required: true,
    name: 'id',
    example: 1,
    type: Number,
    description: 'Id of question',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  async deleteQuestion(@Param('id') id: number): Promise<Status> {
    return await this.questionsService.delete(id);
  }

  @Post(':id/answers')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create answer' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
    schema: {
      example: STATUS.CREATED,
    },
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'Id of question',
  })
  @ApiBody({ type: AnswerDTO })
  async createAnswer(
    @Req() req: Request,
    @Body() answer: AnswerDTO,
    @Param('id') id: number,
  ): Promise<Status> {
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
    },
  })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'Id of answer',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiParam({
    name: 'idQ',
    example: 1,
    type: Number,
    description: 'Id of Question',
  })
  async deleteAnswer(
    @Param('id') id: number,
    @Param('questionId') questionId: number,
  ): Promise<Status> {
    return await this.answersService.delete(id, questionId);
  }
}
