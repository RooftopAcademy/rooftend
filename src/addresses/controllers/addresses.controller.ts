import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressesService } from '../services/addresses.service';
import { Address } from '../entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Request } from 'express';
import { CreateAddressDto } from '../entities/create.address.dto';

@ApiTags('Addresses')
@ApiBearerAuth()
@Controller('adresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 100,
    description: 'A list with all the Addreses',
    schema: {
      example: {
        addresses: [
          {
            id: '1',
            createdAt: '2022-01-15T21:56:42.157Z',
            updatedAt: '2022-01-15T21:56:42.157Z',
            countryCode: 'ARG',
            countryState: 'safsa',
            cityName: 'dsadsafds',
            streetName: 'dsafsa',
            streetNumber: '65762',
            zipCode: 'sa52a',
            subjectId: 1,
            subjectType: 'dsa',
          }
        ]
      }
    }
  })
  public findAll() {
    this.addressesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a single address by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'A addresses found with the passed ID',
    type: Address,
  })
  @Get(':id')
  @HttpCode(200)
  public find(
    @Param('id') id: string
  ): Promise<Address> {
    return this.addressesService.findOne(id);
  }

  @Patch()
  @HttpCode(200)
  public edit(@Param('id') id: string) {
    return this.addressesService.edit(id);
  }

  @Delete('id')
  @HttpCode(203)
  public delete(@Param('id') id: string) {
    return this.addressesService.delete(id);
  }

  @ApiOperation({
    summary: 'Create an address',
  })
  @ApiResponse({
    status: 201,
    description: 'The created address',
    type: Address,
  })
  @Post()
  @HttpCode(201)
  public created(
    @Body() body: CreateAddressDto
  ) {
    return this.addressesService.create(body);
  }
}
