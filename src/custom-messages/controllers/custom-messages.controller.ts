import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CustomMessagesService } from '../services/custom-messages.service';

import { CreateCustomMessageDTO } from '../entities/create-custom-messages.dto';
import { CustomMessage } from '../entities/custom-messages.entity';
import { UpdateCustomMessageDTO } from '../entities/update-custom-messages.dto';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../auth/enums/permission.enum';
import { subject } from '@casl/ability';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Request } from 'express';

@ApiTags('Custom Messages')
@Controller('custom-messages')
export class CustomMessagesController {
  constructor(
    private readonly CustomMessagesService: CustomMessagesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  private async failIfCannotAccess(
    permission: Permission,
    user: User,
    customMessageId: number,
  ): Promise<CustomMessage> {
    const customMessage: CustomMessage =
      await this.CustomMessagesService.findOne(customMessageId);

    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.cannot(permission, subject('CustomMessage', customMessage)))
      throw new ForbiddenException();

    return customMessage;
  }

  @ApiOperation({ summary: 'Get all custom messages by User Id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'All the custom messages from the authenticated user',
    type: [CustomMessage],
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Get()
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @HttpCode(200)
  getAll(@Req() req: Request): Promise<CustomMessage[]> {
    const user: any = req.user;

    return this.CustomMessagesService.findAll(user);
  }

  @ApiOperation({ summary: 'Get a single custom message by ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The custom message found with the passed ID',
    type: CustomMessage,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Not Found Custom Message',
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Get(':id')
  @HttpCode(200)
  getOne(@Req() req: Request, @Param('id') id: number): Promise<CustomMessage> {
    const user: any = req.user;

    return this.failIfCannotAccess(Permission.Read, user, id);
  }

  @ApiOperation({ summary: 'Create a custom message' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The created custom message',
    type: CustomMessage,
  })
  @ApiBadRequestResponse({
    description: 'The message could not be created',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Post()
  @HttpCode(201)
  create(
    @Req() req: Request,
    @Body() body: CreateCustomMessageDTO,
  ): Promise<CustomMessage> {
    const user: any = req.user;

    return this.CustomMessagesService.create(user, body);
  }

  @ApiOperation({ summary: 'Update a custom message by ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The updated custom message',
    type: CustomMessage,
  })
  @ApiBadRequestResponse({
    description: 'The message could not be updated',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Not Found Custom Message',
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Patch(':id')
  @HttpCode(204)
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() body: UpdateCustomMessageDTO,
  ): Promise<CustomMessage> {
    const user: any = req.user;

    const customMessage: CustomMessage = await this.failIfCannotAccess(
      Permission.Update,
      user,
      id,
    );

    return this.CustomMessagesService.update(customMessage, body);
  }

  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'If the message was removed or not',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'The message could not be deleted',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @Delete(':id')
  @HttpCode(200)
  async delete(@Req() req: Request, @Param('id') id: number): Promise<boolean> {
    const user: any = req.user;

    this.failIfCannotAccess(Permission.Delete, user, id);

    return this.CustomMessagesService.delete(id);
  }
}
