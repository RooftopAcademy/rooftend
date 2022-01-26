import {
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HistoryService } from '../services/history.service';
import { History } from '../models/history.entity';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { User } from '../../users/entities/user.entity';
import { Request } from 'express';
import STATUS from '../../statusCodes/statusCodes';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @ApiOperation({ summary: 'A list with the items visited by the user' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the History',
    schema: {
      example: {
        history: [
          {
            "items": [
              {
                "id": "997",
                "createdAt": "2022-01-25T18:27:06.694Z",
                "deletedAt": null,
                "item": {
                  "id": "102",
                  "createdAt": "2022-01-15T23:09:30.736Z",
                  "updatedAt": "2022-01-15T23:09:30.736Z",
                  "title": "Sloe Gin - Mcguinness",
                  "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
                  "price": 50174.66,
                  "stock": 8039,
                  "deletedAt": null,
                  "user": {
                    "id": "135",
                    "username": "cpennells3q",
                    "email": "ycockshott3q@spotify.com",
                    "completed": false
                  }
                }
              }
            ],
            "meta": {
              "totalItems": 1,
              "itemCount": 1,
              "itemsPerPage": 10,
              "totalPages": 1,
              "currentPage": 1
            },
            "links": {
              "first": "/history?limit=10",
              "previous": "",
              "next": "",
              "last": "/history?page=1&limit=10"
            },
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiQuery({
    required: false,
    name: 'page',
    description: 'Page of the result',
    example: 1,
  })
  @ApiQuery({
    required: false,
    name: 'limit',
    description: 'Max amount of items per page',
    example: 10,
  })
  @ApiBearerAuth()
  @Get()
  @HttpCode(200)
  async getAll(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    const user: User = <User>req.user;

    return this.historyService.paginate(
      {
        page,
        limit,
        route: '/history',
      },
      user,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a history' })
  @ApiResponse({
    status: 200,
    description: 'The history has been removed successfully.',
    schema: {
      example: STATUS.DELETED,
    },
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'History Not Found',
    schema: {
      example: new NotFoundException('History not found').getResponse(),
    },
  })
  @ApiBearerAuth()
  @HttpCode(200)
  async delete(@Req() req: Request, @Param('id') id: number) {
    const user: User = <User>req.user;
    
    const history = await this.historyService.findHistory(id);

    if (!history) {
      throw new NotFoundException('History not found.');
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Delete, subject('History', history))) {
      throw new ForbiddenException();
    }

    await this.historyService.delete(id);

    return STATUS.DELETED;
  }
}
