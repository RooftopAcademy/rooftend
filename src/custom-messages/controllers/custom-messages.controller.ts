import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CustomMessagesService } from '../services/custom-messages.service';

import { CreateCustomMessageDTO } from '../entities/create-custom-messages.dto';
import { CustomMessage } from '../entities/custom-messages.entity';
import { GetCustomMessageDTO } from '../entities/get-custom-messages.dto';
import { UpdateCustomMessageDTO } from '../entities/update-custom-messages.dto';

@Controller('custom-messages')
export class CustomMessagesController {
  constructor(private readonly CustomMessagesService: CustomMessagesService) { }

  @ApiOperation({ summary: 'Get all custom messages by User Id' })
  @ApiResponse({
    status: 200,
    description: 'All the custom messages from the authenticated user',
    type: [CustomMessage],
  })
  @Get()
  @ApiForbiddenResponse({
    description: "Forbidden"
  })
  @HttpCode(200)
  getAll(@Query() query: GetCustomMessageDTO): Promise<CustomMessage[]> {
    return this.CustomMessagesService.findAll(query.user_id);
  }

  @ApiOperation({ summary: 'Get a single custom message by ID' })
  @ApiResponse({
    status: 200,
    description: 'The custom message found with the passed ID',
    type: CustomMessage,
  })
  @ApiForbiddenResponse({
    description: "Forbidden"
  })
  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: number): Promise<CustomMessage> {
    return this.CustomMessagesService.findOne(id);
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
    description: "Forbidden"
  })
  @Post()
  @HttpCode(201)
  create(@Body() body: CreateCustomMessageDTO): Promise<CustomMessage[]> {
    return this.CustomMessagesService.create(body);
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
    description: "Forbidden"
  })
  @Patch(':id')
  @HttpCode(204)
  update(
    @Param('id') id: number,
    @Body() body: UpdateCustomMessageDTO,
  ): Promise<CustomMessage> {
    return this.CustomMessagesService.update(id, body);
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
    description: "Forbidden"
  })
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number): Promise<boolean> {
    return this.CustomMessagesService.delete(id);
  }
}
