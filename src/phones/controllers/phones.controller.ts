import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PhonesService } from '../services/phones.service';

@Controller('phones')
export class PhonesController {
  constructor(private phonesService: PhonesService) {}

  @Get()
  getAll() {
    return this.phonesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.phonesService.findOne(id);
  }

  @Post()
  create(@Body() bodyParams: any) {
    return this.phonesService.create(bodyParams);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() bodyParams: any) {
    return this.phonesService.update(id, bodyParams);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.phonesService.delete(id);
  }
}
