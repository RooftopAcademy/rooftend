import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateSavedItemDto } from '../dto/createSavedItemDto';
import { SavedItemsService } from '../services/saved-items.service';
import { UpdateSavedItemDto } from '../dto/updateSavedItemDto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SavedItemsEntity } from '../entities/savedItems.entity';

@ApiTags('Saved')
@Controller('saved')
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all saved items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all saved items',
    type: [SavedItemsEntity],
  })
  async findAll(
    @Res({ passthrough: true }) res: Response,
  ): Promise<SavedItemsEntity[]> {
    const data = await this.savedItemsService.getAllSavedItems();
    res.status(HttpStatus.OK);
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Add a new saved item' })
  @ApiCreatedResponse({
    description: 'The saved item has been successfully created.',
    schema: {
      example: {
        message: 'Successfully created',
        item: { id: 1, itemId: 1, userId: 1, quantity: 1, price: 100 },
      },
      properties: {
        message: {
          type: 'String',
          description: 'message for successful creation',
          example: 'Successfully created',
        },
        item: { $ref: getSchemaPath(SavedItemsEntity) },
      },
    },
  })
  create(@Res() res: Response, @Body() createSavedItemDto: CreateSavedItemDto) {
    this.savedItemsService
      .createSavedItem(createSavedItemDto)
      .then((savedItem) => {
        res
          .status(HttpStatus.CREATED)
          .json({ message: 'Successfully created', item: savedItem });
      });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a saved item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The saved item has been successfully updated.',
    schema: {
      example: {
        message: 'item with id 5 updated successfully',
      },
      properties: {
        message: {
          type: 'String',
          description: 'message for successful update',
          example: 'item with id 5 updated successfully',
        },
      },
    },
  })
  update(
    @Res() res: Response,
    @Param() params,
    @Body() updateSavedItemDto: UpdateSavedItemDto,
  ) {
    this.savedItemsService
      .updateSavedItem(params.id, updateSavedItemDto)
      .then((savedItem) => {
        res
          .status(HttpStatus.OK)
          .json({ message: `item with id ${params.id} updated successfully` });
      });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a saved item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The saved item has been successfully deleted.',
    schema: {
      example: {
        message: 'item with id 5 deleted successfully',
      },
      properties: {
        message: {
          type: 'String',
          description: 'message for successful deletion',
          example: 'item with id 5 deleted successfully',
        },
      },
    },
  })
  remove(@Res() res: Response, @Param() params) {
    this.savedItemsService.removeSavedItem(params.id).then(() => {
      res.status(HttpStatus.OK).json({
        message: `item with id ${params.id} deleted successfully`,
      });
    });
  }
}
