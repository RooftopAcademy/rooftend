import { Controller, NotFoundException, UnprocessableEntityException, UsePipes } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiTags,
    ApiQuery,
    ApiParam
} from '@nestjs/swagger';
import {
    Get,
    Param,
    Post,
    Body,
    Patch,
    HttpCode,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { MessagePostPurchaseService } from '../services/message-post-purchase.service';
import { MessagePostPurchase } from '../entities/message-post-purchase.entity';
import { CreateMessageDTO } from '../entities/create-message-dto';
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
    @ApiQuery({
        name: 'page',
        type: Number,
        required: false,
        description: 'Current page number',
        example: 1
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        required: false,
        description: 'limit of items',
        example: 10
    })
    @ApiParam({
        name: 'cartId',
        type: Number,
        required: true,
        description: 'Id of cart',
        example: 1
    })
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
    })
    @ApiBadRequestResponse({
        description: 'The message could not be updated',
    })
    @Patch('messages/:message_id')
    @ApiParam({
        name: 'message_id',
        type: Number,
        required: true,
        description: 'Id of message',
        example: 1
    })
    @HttpCode(204)
    async update(
        @Param('message_id') message_id: number,
        @Body('status', StatusValidationPipe) status: string
    ): Promise<MessagePostPurchase> {
        let message = await this.messageService.findOneById(message_id)

        if (!message) {
            throw new NotFoundException();
        }

        return await this.messageService.update(message_id, {
            [`${status}At`] : new Date
        });
    }
}
