import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../entities/create-user-dto.entity';
import { Response } from 'express';
import { User } from '../entities/user.entity';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'A list with all the users',
    type: User,
  })
  @Get()
  @HttpCode(200)
  getAll() {
    return this.userService.findAll().then((data) => {
      return data;
    });
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({
      page,
      limit,
      route: '/users',
    });
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @Get(':id')
  @HttpCode(200)
  findOne(
    @Param('id') id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService
      .findOne(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('User not found');
        }
        return data;
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The user could not be created',
  })
  async create(
    @Body() CreateUserDTO: CreateUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService
      .create(CreateUserDTO)
      .then(() => {
        response.status(200).end('user created');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The user could not be updated',
  })
  update(
    @Param('id') id: number,
    @Body() createUserDTO: CreateUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService
      .findOne(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('user not found');
        }
        this.userService.update(id, createUserDTO);
        response.status(200).end('user updated');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been removed successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The user could not be removed',
  })
  remove(
    @Param('id') id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService
      .findOne(id)
      .then((data) => {
        if (!data) {
          response.status(400).end('User not found');
        }
        this.userService.delete(id);
        response.status(200).end('User removed');
      })
      .catch((err) => {
        response.status(400).end(err.message);
      });
  }
}
