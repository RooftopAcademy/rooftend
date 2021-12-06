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

@Controller('saved')
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @Get()
  findAll(@Res() res: Response) {
    this.savedItemsService.getAllSavedItems().then((savedItems) => {
      res.status(HttpStatus.OK).json(savedItems);
    });
  }

  @Post()
  create(@Res() res: Response, @Body() createSavedItemDto: CreateSavedItemDto) {
    this.savedItemsService
      .createSavedItem(createSavedItemDto)
      .then((savedItem) => {
        res
          .status(HttpStatus.CREATED)
          .json({ 'Successfully created': savedItem });
      });
  }

  @Patch(':id')
  update(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updateSavedItemDto: UpdateSavedItemDto,
  ) {
    this.savedItemsService
      .updateSavedItem(id, updateSavedItemDto)
      .then((savedItem) => {
        res
          .status(HttpStatus.OK)
          .json({ message: `item with id ${id} updated successfully` });
      });
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: number) {
    this.savedItemsService.removeSavedItem(id).then(() => {
      res.status(HttpStatus.OK).json({
        message: `item with id ${id} deleted successfully`,
      });
    });
  }
}
