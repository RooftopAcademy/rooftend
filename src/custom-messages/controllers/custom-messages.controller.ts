import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
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
import { PoliciesGuard } from '../../auth/guards/policies.guard';

@Controller('custom-messages')
export class CustomMessagesController {
  constructor(private readonly CustomMessagesService: CustomMessagesService) {}

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
  getAll(): Promise<CustomMessage[]> {
    const user: User = new User();
    user.id = 1;

    return this.CustomMessagesService.findAll(user);
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
  @UseGuards(PoliciesGuard)
  @HttpCode(200)
  getOne(@Param('id') id: number): Promise<CustomMessage> {
    const user: User = new User();
    user.id = 1;

    return this.CustomMessagesService.findOne(user, id);
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
  create(@Body() body: CreateCustomMessageDTO): Promise<CustomMessage> {
    const user: User = new User();
    user.id = 1;

    return this.CustomMessagesService.create(user, body);
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
  @UseGuards(PoliciesGuard)
  @HttpCode(204)
  update(
    @Param('id') id: number,
    @Body() body: UpdateCustomMessageDTO,
  ): Promise<CustomMessage> {
    const user: User = new User();
    user.id = 1;

    return this.CustomMessagesService.update(user, id, body);
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
  @UseGuards(PoliciesGuard)
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<boolean> {
    const user: User = new User();
    user.id = 1;

    return this.CustomMessagesService.delete(user, id);
  }
}
