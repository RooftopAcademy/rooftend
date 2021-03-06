import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  PartialType,
  OmitType,
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { EditPasswordDTO } from '../entities/edit-password-dto.entity';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Get the logged user' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: PartialType(
      OmitType(User, ['password'] as const),
    ),
  })
  @Get()
  @HttpCode(200)
  async findOne(@Req() req) {
    const id = req.user.id;

    return await this.userService.returnLoggedUser(id);
  }

  @Patch('username')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update username of logged user' })
  @ApiResponse({
    status: 200,
    description: 'Data modified, please login again.',
  })
  @ApiConflictResponse({
    status: 409,
    description: "The username is already in use",
  })
  @ApiBody({
    schema: {
      example: { "username": "New username" }
    }
  })
  async updateUsername(
    @Req() req,
    @Body('username') newUsername: string,
  ) {
    const id = req.user.id;

    const user = await this.userService.findOneByUsername(newUsername);

    if (user) {
      throw new HttpException('The username is already in use', HttpStatus.CONFLICT);
    }

    return await this.userService.update(id, { username: newUsername });
  }

  @Patch('email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update email of logged user' })
  @ApiResponse({
    status: 200,
    description: 'Data modified, please login again.',
  })
  @ApiConflictResponse({
    status: 409,
    description: "The email is already in use",
  })
  @ApiBody({
    schema: {
      example: { "email": "New email" }
    }
  })
  async updateEmail(
    @Req() req,
    @Body('email') newEmail: string,
  ) {
    const id = req.user.id;

    const user = await this.userService.findOneByEmail(newEmail);

    if (user) {
      throw new HttpException('The email is already in use', HttpStatus.CONFLICT);
    }

    return this.userService.update(id, { email: newEmail });
  }

  @Patch('password')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  @ApiOperation({ summary: 'Update password of logged user' })
  @ApiResponse({
    status: 200,
    description: 'Password updated, please login again.',
  })
  @ApiConflictResponse({
    status: 409,
    description: "New password should be different from the current one",
  })
  @ApiForbiddenResponse({
    status: 403,
    description: "Invalid current password",
  })
  async updatePassword(
    @Req() req,
    @Body() editPasswordDTO: EditPasswordDTO,
  ) {
    const id = req.user.id;

    const passwordsMatch = await this.userService.validateCurrentPassword(req.user, editPasswordDTO.currentPassword);

    if (!passwordsMatch) {
      throw new HttpException("Invalid current password", HttpStatus.FORBIDDEN)
    }

    if (editPasswordDTO.currentPassword == editPasswordDTO.newPassword) {
      throw new HttpException("New password should be different from the current one", HttpStatus.CONFLICT)
    }

    return this.userService.updatePassword(id, editPasswordDTO);
  }

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove the logged user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted.',
  })
  @ApiBadRequestResponse({
    description: 'The user could not be removed',
  })
  remove(@Req() req) {
    const id = req.user.id;

    return this.userService.delete(id);
  }
}
