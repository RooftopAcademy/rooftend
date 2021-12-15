import { Controller } from '@nestjs/common';
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
import { CreateMessageDTO } from '../entities/message-dto';
import { updateMessageDto } from '../entities/update-message-dto';



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
        return this.messageService.paginate({
            page,
            limit,
            route: `/purchase/${cartId}/messages`,
        }, cartId);
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
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.messageService
            .create(CreateMessageDTO)
            .then(() => {
                response.status(200).end('Message created');
            })
            .catch((err) => {
                response.status(400).end(err.message);
            });
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
    @Patch(':cartId/messages/:id_message')
    @HttpCode(204)
    async update(
        @Param('id_message') id_message: number,
        @Body() body: updateMessageDto,
    ): Promise<MessagePostPurchase> {
        const res = await this.messageService.update(id_message, body);
        return res;
    }


    @Delete(':cart_id/messages')
    @HttpCode(403)
    @ApiForbiddenResponse({
        status: 403,
        description: 'Forbidden',
        schema: {
            example: {
                "statusCode": 403,
                "message": "Forbidden"
            }
        }
    })
    public async getById() {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
}
