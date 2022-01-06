import { Controller, NotFoundException, UnprocessableEntityException, UsePipes } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiTags
} from '@nestjs/swagger';
import {
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    HttpCode,
    Res,
    HttpException,
    HttpStatus,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { MessagePostPurchaseService } from '../services/message-post-purchase.service';
import { MessagePostPurchase } from '../entities/message-post-purchase.entity';
import { Response } from 'express';
import { CreateMessageDTO } from '../entities/create-message-dto';
import { ReceivedMessageDTO } from '../entities/received-message-dto';
import { ReadMessageDTO } from '../entities/read-message-dto';
import { StatusValidationPipe } from '../entities/status-validation-pipe';



@ApiTags('Messages Post Purchase')
@Controller('purchase')
export class MessagePostPurchaseController {
    constructor(private readonly messageService: MessagePostPurchaseService) { }

    @ApiOperation({ summary: 'Get all messages by cartId' })
    @ApiResponse({
        status: 200,
        description: 'A list with all the messages',
        type: MessagePostPurchase,
    })
    @Get(':cartId/messages')
    find(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
        @Param('cartId') cartId: number
    ) {
        limit = limit > 100 ? 100 : limit;
        return this.messageService.find(cartId, {
            limit,
            page,
            route: `/purchase/${cartId}/messages`,
        });
    }

    @Post(':cartId/messages')
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a Message for a purchase' })
    @ApiResponse({
        status: 201,
        description: 'The Message has been created successfully.',
    })
    @ApiBadRequestResponse({
        description: 'The message could not be created',
    })
    async create(
        @Body() CreateMessageDTO: CreateMessageDTO,
    ) {
        try {
            return await this.messageService.create(CreateMessageDTO)
        } catch (err) {
            throw new UnprocessableEntityException(err)
        }
    }


    @ApiOperation({ summary: 'Update a message post purchase by ID' })
    @ApiResponse({
        status: 204,
        description: 'Message updated succesfully',
        type: MessagePostPurchase,
    })
    @ApiBadRequestResponse({
        description: 'The message could not be updated',
    })
    @Patch(':cartId/messages/:messageId')
    @HttpCode(204)
    async update(
        @Param('messageId') messageId: number,
        @Body('status', new StatusValidationPipe()) status
    ): Promise<MessagePostPurchase> {
        let message = await this.messageService.findOneById(messageId)

        if (!message) {
            throw new NotFoundException();
        }

        return await this.messageService.update(messageId, {
            [`${status}At`] : new Date
        });
    }
}
