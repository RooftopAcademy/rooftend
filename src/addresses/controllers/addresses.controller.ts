import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UnprocessableEntityException
} from '@nestjs/common';
import { ApiParam, ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AddressesService } from '../services/addresses.service';

@ApiTags('Addresses')
@Controller('adresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @ApiOperation({ summary: 'Get address by Id' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of address',
    example: 1
  })
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.addressesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Address updated succesfully',
  })
  @ApiBadRequestResponse({
    description: 'The address could not be updated',
  })
  @ApiParam({
    name: 'address_id',
    type: Number,
    required: true,
    description: 'Id of address',
    example: 1
  })
  async edit(@Param('id') id: number, @Body() body) {
    return await this.addressesService.update(id,body);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create an Address' })
  @ApiResponse({
    status: 201,
    description: 'The Address has been created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The address could not be created',
  })
  async created(@Body() body) {
    try {
      return await this.addressesService.create(body)
    } catch (error) {
      throw new UnprocessableEntityException(error)
    }
  }
}
