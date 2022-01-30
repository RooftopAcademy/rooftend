import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
  Req,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { PhotosInterface } from '../models/photos.interface';
import { PhotosService } from '../services/photos.service';
import { Photos } from '../models/photos.entity';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '../../users/entities/user.entity';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import STATUS from '../../statusCodes/statusCodes';
import Status from '../../statusCodes/status.interface';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) { }
  @ApiCreatedResponse({ 
    type: Photos, 
    description: 'Created a new photo' 
  })
  @ApiOperation({ summary: 'Create a photo' })
  @ApiBody({ type: Photos })
  @HttpCode(201)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() photo: PhotosInterface,
  ) {
    this.photosService.create(photo);

    return STATUS.CREATED;
  }

  @ApiOperation({ summary: 'Return all photos' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Number of the page',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Max number of results (10 by default)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all photos',
    type: Photos,
  })
  @Get()
  findAll(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    const user: User = <User>req.user;

    return this.photosService.paginate(
      {
        page,
        limit,
        route: '/photos',
      },
      user,
    );
  }

  @ApiOperation({ summary: 'Delete a given photo' })
  @ApiResponse({
    status: 200,
    description: 'Photo deleted sucessfully',
    schema: {
      example: STATUS.DELETED,
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: new UnauthorizedException().getResponse(),
    },
    description: 'User is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'User is not authorized to delete this photo',
    schema: {
      example: new ForbiddenException().getResponse(),
    },
  })
  @ApiNotFoundResponse({
    description: 'Photo Not Found',
    schema: {
      example: new NotFoundException('Photo not found').getResponse(),
    }
  })
  @ApiBearerAuth()
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<Status> {
    const user: User = <User>req.user;

    const ability = this.caslAbilityFactory.createForUser(user);

    const photo = await this.photosService.findOne(id);
    
    if(!photo) {
      throw new NotFoundException('Photo not found');
    }

    if(ability.cannot(Permission.Delete, subject('Photos', Photos))) {
      throw new ForbiddenException();
    }

    this.photosService.delete(photo);

    return STATUS.DELETED;
  }
}
