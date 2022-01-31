import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AddressesService } from '../services/addresses.service';
import { Address } from '../entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Request } from 'express';
import { CreateAddressDto } from '../entities/create.address.dto';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import STATUS from '../../statusCodes/statusCodes';

@ApiTags('Addresses')
@ApiBearerAuth()
@Controller('adresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {  }

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
    @Param('id') id: number
  ): Promise<Address> {
    return this.addressesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an address by ID' })
  @ApiBody({ 
    //type: , 
    required: false 
  })
  @ApiResponse({
    status: 200,
    description: 'Address updated successfully',
    schema: {
      example: STATUS.UPDATED,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'The minimum of the city name is 100',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to update this address',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Item Not Found',
    schema: {
      example: new NotFoundException('Address not found').getResponse(),
    },
  })
  @Patch(':id')
  @HttpCode(200)
  public async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() body,
  ) {
    const user: User = <User>req.user;

    const address = await this.addressesService.findOne(id);

    const ability = this.caslAbilityFactory.createForUser(user);

    if(!address) {
      throw new NotFoundException('Address not found');
    }

    if(ability.cannot(Permission.Update, subject('Address', address))) {
      throw new ForbiddenException();
    }

    this.addressesService.update(address, body);

    return STATUS.UPDATED;
  }

  @ApiOperation({
     summary: 'Delete an address by ID' 
  })
  @ApiResponse({
    status: 200,
    description: 'Address deleted sucessfully',
    schema: {
      example: STATUS.DELETED,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    schema: {
      example: new BadRequestException([
        'the itemId must be a number',
      ]).getResponse(),
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to delete this address',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Address Not Found',
    schema: {
      example: new NotFoundException('Address not found').getResponse(),
    },
  })
  @Delete('id')
  @HttpCode(203)
  public async delete(
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const user: User = <User>req.user;

    const address = await this.addressesService.findOne(id);

    const ability = this.caslAbilityFactory.createForUser(user);

    if(!address) {
      throw new NotFoundException('Address not found');
    }

    if(ability.cannot(Permission.Delete, subject('Address', address))) {
      throw new ForbiddenException();
    }

    this.addressesService.delete(id);

    return STATUS.DELETED;
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
    @Body() body: CreateAddressDto,
  ) {
    return this.addressesService.create(body);
  }
}
