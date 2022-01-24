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
  ApiOperation,
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

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @ApiOperation({ summary: 'Get all history' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the History',
    type: History,
    schema: {
      example: {
        history: [
          {
            id: '1',
            user: {
              id: '1',
              username: 'kdougharty1r',
              email: 'modriscole1r@cnn.com',
              account_status: 2,
              deletedAt: null,
              completed: false,
            },
            item: {
              id: '1',
              createdAt: '2022-01-15T21:56:42.157Z',
              updatedAt: '2022-01-15T21:56:42.157Z',
              title: 'GherkinSour',
              description: 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
              price: 4271.85,
              stock: 1176,
              brand: {
                id: '66',
                name: 'functionalities',
                photoUrl: 'http://dummyimage.com/100x100.png/cc0000/ffffff',
              },
              user: {
                id: '64',
                username: 'kdougharty1r',
                email: 'modriscole1r@cnn.com',
                account_status: 2,
                deletedAt: null,
                completed: false,
              },
              category: {
                id: 65,
                name: 'Clothing',
              },
            }
          }
        ]
      }
    }
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
