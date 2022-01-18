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
} from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HistoryService } from '../services/history.service';
import { History } from '../models/history.entity';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {};

  @ApiOperation({ summary: 'Get all history' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the History',
    type: History,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiBearerAuth()
  @Get()
  @HttpCode(200)
  async getAll(
    @Param('id') id: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    const user: any = id;
    const history = await this.historyService.findHistory(user);

    if(!history) {
      throw new NotFoundException('History not found.');
    };

    const ability = this.caslAbilityFactory.createForUser(user);

    if(ability.cannot(Permission.Read, subject('History', history))) {
      throw new ForbiddenException();
    };

    return this.historyService.paginate({
      page,
      limit,
      route: '/history',
    },
      user,
    );
  };

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a history' })
  @ApiResponse({
    status: 200,
    description: 'The history has been removed successfully.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<boolean> {
    return this.historyService.delete(id);
  };
}
