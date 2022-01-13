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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../entities/phone.entity';

@ApiTags('Phones')
@Controller('phones')
export class PhonesController {
  constructor(private phonesService: PhonesService) { }

  @Get()
  @ApiOperation({ summary: 'Get all phones' })
  @ApiOkResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number, by default is 1',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit of phones to return, max is 10',
    type: Number,
  })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.phonesService.paginate({
      page,
      limit,
      route: '/phones',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get phone by id' })
  @ApiOkResponse({ status: 200, description: 'Ok', type: Phone })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'Phone id',
    required: true,
  })
  getOne(@Param('id') id: number) {
    return this.phonesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create phone' })
  @ApiCreatedResponse({ status: 201, description: 'Created' })
  @ApiBody({ type: Phone })
  create(@Body() bodyParams: Phone) {
    return this.phonesService.create(bodyParams);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update phone' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Phone id to be updated',
  })
  @ApiBody({ type: Phone })
  update(@Param('id') id: number, @Body() bodyParams: any) {
    return this.phonesService.update(id, bodyParams);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete phone' })
  @ApiOkResponse({ status: 200, description: 'Deleted' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Phone id to be deleted',
  })
  delete(@Param('id') id: number) {
    return this.phonesService.delete(id);
  }
}
