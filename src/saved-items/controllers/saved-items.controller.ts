import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateSavedItemDto } from '../dto/CreateSavedItemDto';
import { SavedItemsService } from '../services/saved-items.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import STATUS from '../../statusCodes/statusCodes';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import Status from '../../statusCodes/status.interface';
import { User } from '../../users/entities/user.entity';
import { subject } from '@casl/ability';
import { Permission } from '../../auth/enums/permission.enum';

@ApiTags('Saved')
@ApiBearerAuth()
@Controller('saved')
export class SavedItemsController {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly savedItemsService: SavedItemsService,
  ) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all saved items' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns all saved items',
  //   type: [CreateSavedItemDto],
  //   schema: {
  //     example: {
  //       items: [{}],
  //     },
  //   },
  // })
  // async findAll(
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<CreateSavedItemDto[]> {
  //   const rawData = await this.savedItemsService.getAllSavedItems();
  //   res.status(HttpStatus.OK);
  //   const data: CreateSavedItemDto[] = rawData.map((item) => {
  //     return {
  //       // itemId: item.itemId,
  //       // userId: item.userId,
  //       quantity: item.quantity,
  //       price: item.price,
  //     };
  //   });
  //   return data;
  // }

  // @Post()
  // @ApiOperation({ summary: 'Add a new saved item' })
  // @ApiCreatedResponse({
  //   description: 'The saved item has been successfully created.',
  //   schema: {
  //     example: {
  //       message: 'Successfully created',
  //       // item: { userId: 1, quantity: 1, price: 100 },
  //     },
  //     properties: {
  //       message: {
  //         type: 'String',
  //         description: 'message for successful creation',
  //         example: 'Successfully created',
  //       },
  //       item: { $ref: getSchemaPath(CreateSavedItemDto) },
  //     },
  //   },
  // })
  // async create(
  //   @Res({ passthrough: true }) res: Response,
  //   @Body() createSavedItemDto: CreateSavedItemDto,
  // ) {
  //   const rawSavedItem = await this.savedItemsService.createSavedItem(
  //     createSavedItemDto,
  //   );
  //   res.status(HttpStatus.CREATED);
  //   const savedItem: CreateSavedItemDto = {
  //     itemId: rawSavedItem.itemId,
  //     userId: rawSavedItem.userId,
  //     quantity: rawSavedItem.quantity,
  //     price: rawSavedItem.price,
  //   };
  //   return {
  //     message: 'Successfully created',
  //     item: savedItem,
  //   };
  // }

  
  @ApiOperation({ summary: 'Delete a saved item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Saved item deleted successfully.',
    schema: {
      example: STATUS.deleted,
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to delete this saved item',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Saved Item Not Found',
    schema: {
      example: new NotFoundException('Saved item not found').getResponse(),
    },
  })
  @Delete(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  async remove(@Req() req: Request, @Param('id') id: number): Promise<Status> {
    const user: User = <User>req.user;

    const savedItem = await this.savedItemsService.findOneSavedItem(id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(Permission.Delete, subject('SavedItem', savedItem))) {
      throw new ForbiddenException();
    }

    await this.savedItemsService.removeSavedItem(savedItem);

    return STATUS.deleted;
  }
  // async remove(@Res({ passthrough: true }) res: Response, @Param() params) {
  //   try {
  //     const response = await this.savedItemsService.removeSavedItem(params.id);
  //     if (response.affected == 0) {
  //       throw new Error('Error: item with id ' + params.id + ' not found');
  //     }
  //     res.status(HttpStatus.OK);
  //     return `Item with id ${params.id} deleted successfully`;
  //   } catch (err) {
  //     res.status(HttpStatus.NOT_FOUND);
  //     return err.message;
  //   }
  // }
}
