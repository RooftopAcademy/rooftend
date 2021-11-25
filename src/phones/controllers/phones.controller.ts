import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PhonesService } from '../services/phones.service';

@Controller('phones')
export class PhonesController {
  constructor(private phonesService: PhonesService) {}

  @Get()
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    //return this.phonesService.findAll();
    limit = limit > 100 ? 100 : limit;
    return this.phonesService.paginate({
      page,
      limit,
      route: '/phones',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.phonesService.findOne(id);
  }

  @Post()
  create(@Body() bodyParams: any) {
    return this.phonesService.create(bodyParams);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() bodyParams: any) {
    return this.phonesService.update(id, bodyParams);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.phonesService.delete(id);
  }
}
