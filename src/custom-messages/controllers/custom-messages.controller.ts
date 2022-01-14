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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
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

@Controller('custom-messages')
export class CustomMessagesController {
  constructor(
    private readonly CustomMessagesService: CustomMessagesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  private async failIfCanNotAccess(
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
  @ApiResponse({
    status: 200,
    description: 'All the custom messages from the authenticated user',
    type: [CustomMessage],
  })
  @Get()
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @HttpCode(200)
  getAll(@Req() req: Request): Promise<CustomMessage[]> {
    const user: any = req.user;

    return this.CustomMessagesService.findAll(user.result);
  }

  @ApiOperation({ summary: 'Get a single custom message by ID' })
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
  @Get(':id')
  @HttpCode(200)
  getOne(@Req() req: Request, @Param('id') id: number): Promise<CustomMessage> {
    const user: any = req.user;

    return this.failIfCanNotAccess(Permission.Read, user.result, id);
  }

  @ApiOperation({ summary: 'Create a custom message' })
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
  @Post()
  @HttpCode(201)
  create(
    @Req() req: Request,
    @Body() body: CreateCustomMessageDTO,
  ): Promise<CustomMessage> {
    const user: any = req.user;

    return this.CustomMessagesService.create(user.result, body);
  }

  @ApiOperation({ summary: 'Update a custom message by ID' })
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
  @Patch(':id')
  @HttpCode(204)
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() body: UpdateCustomMessageDTO,
  ): Promise<CustomMessage> {
    const user: any = req.user;

    const customMessage: CustomMessage = await this.failIfCanNotAccess(
      Permission.Update,
      user.result,
      id,
    );

    return this.CustomMessagesService.update(customMessage, body);
  }

  @ApiOperation({ summary: 'Delete a message by ID' })
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
  @Delete(':id')
  @HttpCode(200)
  async delete(@Req() req: Request, @Param('id') id: number): Promise<boolean> {
    const user: any = req.user;

    const customMessage: CustomMessage =
      await this.CustomMessagesService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(user.result);

    if (
      ability.cannot(Permission.Delete, subject('CustomMessage', customMessage))
    ) {
      throw new ForbiddenException();
    }

    return this.CustomMessagesService.delete(id);
  }
}
