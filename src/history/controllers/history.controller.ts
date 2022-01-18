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
import { identity } from 'rxjs';

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
  })
  //Agregar la docu del schema
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    //Agregar los ejemplos
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
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
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
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
