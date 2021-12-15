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

@ApiTags('Saved')
@Controller('saved')
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all saved items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all saved items',
    type: [CreateSavedItemDto],
  })
  async findAll(
    @Res({ passthrough: true }) res: Response,
  ): Promise<CreateSavedItemDto[]> {
    const rawData = await this.savedItemsService.getAllSavedItems();
    res.status(HttpStatus.OK);
    const data: CreateSavedItemDto[] = rawData.map((item) => {
      return {
        itemId: item.itemId,
        userId: item.userId,
        quantity: item.quantity,
        price: item.price,
      };
    });
    return data;
  }

  @Post()
  @ApiOperation({ summary: 'Add a new saved item' })
  @ApiCreatedResponse({
    description: 'The saved item has been successfully created.',
    schema: {
      example: {
        message: 'Successfully created',
        item: { userId: 1, quantity: 1, price: 100 },
      },
      properties: {
        message: {
          type: 'String',
          description: 'message for successful creation',
          example: 'Successfully created',
        },
        item: { $ref: getSchemaPath(CreateSavedItemDto) },
      },
    },
  })
  async create(
    @Res({ passthrough: true }) res: Response,
    @Body() createSavedItemDto: CreateSavedItemDto,
  ) {
    const rawSavedItem = await this.savedItemsService.createSavedItem(
      createSavedItemDto,
    );
    res.status(HttpStatus.CREATED);
    const savedItem: CreateSavedItemDto = {
      itemId: rawSavedItem.itemId,
      userId: rawSavedItem.userId,
      quantity: rawSavedItem.quantity,
      price: rawSavedItem.price,
    };
    return {
      message: 'Successfully created',
      item: savedItem,
    };
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
  async update(
    @Res({ passthrough: true }) res: Response,
    @Param() params,
    @Body() updateSavedItemDto: UpdateSavedItemDto,
  ) {
    await this.savedItemsService.updateSavedItem(params.id, updateSavedItemDto);
    res.status(HttpStatus.OK);
    return `item with id ${params.id} updated successfully`;
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
          description: 'message for successful or fail deletion',
          example: 'item with id 5 deleted successfully',
        },
      },
    },
  })
  async remove(@Res({ passthrough: true }) res: Response, @Param() params) {
    try {
      const response = await this.savedItemsService.removeSavedItem(params.id);
      if (response.affected == 0)
        throw new Error('item with id ' + params.id + ' not found');
      res.status(HttpStatus.OK);
      return `Error: item with id ${params.id} deleted successfully`;
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND);
      return err.message;
    }
  }
}
