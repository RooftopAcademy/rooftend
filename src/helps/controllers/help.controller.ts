import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  HttpCode,
  Res
} from '@nestjs/common';
import { HelpService } from '../services/help.service';
import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from '../../categories/categories.entity';
import { Response } from 'express';
import { Question } from '../../questions/entities/question.entity';

@ApiTags('Help')
@Controller('help')
export class HelpController {
  constructor(private readonly helpService: HelpService) { }

  @ApiOperation({ summary: 'Returns all help categories.' })
  @ApiResponse({
    status: 200,
    description: 'Returns all help categories.',
    type: [Category],
  })
  @HttpCode(200)
  @Get('categories')
  findAllHelpCategories(): Promise<Category[]> {
    return this.helpService.findAllHelpCategories();
  }

  @ApiOperation({ summary: 'Returns all questions about a specific category.' })
  @ApiResponse({
    status: 200,
    description: 'Returns all questions about a specific category.',
    schema: {
      example: [
        {
          "ID": "1",
          "Question": "Cómo contactar al vendedor"
        },
        {
          "ID": 3,
          "Question": "Cuáles son las formas de pago"
        },
      ],
      properties: {
        ID: {
          type: 'string | number',
          description: 'id field from questions_entity',
          example: 1
        },
        Question: {
          type: 'string',
          description: 'questionContent field from questions_entity',
          example: "Cómo contactar al vendedor"
        }
      }
    }
  })
  @HttpCode(200)
  @Get('categories/:id')
  findAllQuestionsByCategoryId(@Param('id') id: number): Promise<Question[]> {
    return this.helpService.findAllQuestionsByCategoryId(id);
  }

  @ApiOperation({ summary: 'Returns the answer to a specific question.' })
  @ApiResponse({
    status: 200,
    description: 'Returns the answer to a specific question (along with the question).',
    schema: {
      example: {
        "Question": "Cómo contactar al vendedor",
        "Answer": "Hay muchas formas..."
      },
      properties: {
        Question: {
          type: 'string',
          description: 'questionContent field from questions_entity',
          example: "Cómo contactar al vendedor"
        },
        Answer: {
          type: 'string',
          description: 'answer field from questions_entity',
          example: 'Hay muchas formas...'
        }
      }
    }
  })
  @HttpCode(200)
  @Get('question/:id')
  findAnswerToQuestion(@Param('id') id: number): Promise<Question> {
    return this.helpService.findAnswerToQuestion(id);
  }

  @Post()
  @ApiForbiddenResponse({
    description: "Forbidden. It's not allowed to create a help section",
  })
  @HttpCode(403)
  create(@Res() res: Response): void {
    return res.status(403).end();
  }


  @Patch()
  @ApiForbiddenResponse({
    description: "Forbidden. It's not allowed to update a help section",
  })
  @HttpCode(403)
  update(@Res() res: Response) {
    return res.status(403).end();
  }


  @Delete()
  @ApiForbiddenResponse({
    description: "Forbidden. It's not allowed to delete a help section",
  })
  @HttpCode(403)
  delete(@Res() res: Response): void {
    return res.status(403).end();
  }
}
