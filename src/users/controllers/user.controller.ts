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
  UsePipes,
  ValidationPipe,
  Req,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
// import { CreateUserDTO } from '../entities/create-user-dto.entity';
import { Response } from 'express';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { EditPasswordDTO } from '../entities/edit-password-dto.entity';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get logged user' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @Get()
  @HttpCode(200)
  async findOne(@Req() req) {
    const id = req.user.id;

    return await this.userService.returnLoggedUser(id);
  }

  @Patch('username')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a username' })
  @ApiResponse({
    status: 200,
    description: 'The username has been updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The username could not be updated',
  })
  updateUsername(
    @Req() req,
    @Body() username: string,
  ) {
    const id = req.user.id;
    
    return this.userService.update(id, username);
  }

  @Patch('email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a email' })
  @ApiResponse({
    status: 200,
    description: 'The email has been updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The email could not be updated',
  })
  async updateEmail(
    @Req() req,
    @Body('email') newEmail: string,
  ) {
    const id = req.user.id;

    const user = await this.userService.findOneByEmail(newEmail);

    if(user) {
      throw new HttpException('The email is already in use', HttpStatus.CONFLICT);
    }

    return this.userService.update(id, {email: newEmail});
  }

  @Patch('password')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  @ApiOperation({ summary: 'Update a password' })
  @ApiResponse({
    status: 200,
    description: 'The password has been updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'The password could not be updated',
  })
  async updatePassword(
    @Req() req,
    @Body() editPasswordDTO: EditPasswordDTO,
  ) {
    const id = req.user.id;

    // Check if current password match

    const passwordsMatch = await this.userService.validateCurrentPassword(req.user, editPasswordDTO.currentPassword);

    // Check if current password is different from new password

    if(!passwordsMatch) {
      throw new HttpException("Invalid current password", HttpStatus.FORBIDDEN)
    }

    if(editPasswordDTO.currentPassword == editPasswordDTO.newPassword) {
      throw new HttpException("New password should be different from the current one", HttpStatus.CONFLICT)
    }

    return this.userService.updatePassword(id, editPasswordDTO);
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
      .returnLoggedUser(id)
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
