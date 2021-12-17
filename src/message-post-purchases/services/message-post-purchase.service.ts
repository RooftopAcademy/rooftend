import { Injectable } from '@nestjs/common';
import { MessagePostPurchase } from '../entities/message-post-purchase.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';



@Injectable()
export class MessagePostPurchaseService {
    constructor(@InjectRepository(MessagePostPurchase) private messageRepo: Repository<MessagePostPurchase>) {

    }

    async paginate({page,limit}: IPaginationOptions, cartId: number): Promise<Pagination<MessagePostPurchase>> {
        let countMessage = await this.messageRepo.query(`
            SELECT COUNT(*) FROM messages_post_purchase
        `);

        let messages = await this.messageRepo.query(`
          SELECT MGP.id, MGP.cart_id, MGP.message, MGP.sender_id 
          FROM messages_post_purchase MGP
          WHERE MGP.cart_id = ${cartId}
        `);

        const totalMessages = Number(countMessage[0].count);
        const totalPages = Math.ceil(totalMessages / Number(limit));
        const previousPagePath = (Number(page) > 1) ? `/purchase/${cartId}/messages?page=${Number(page) - 1}` : ""
    

        messages = messages.map((item) => {
          return({
            "id": item.id,
            "message": {
              "cart_id": item.cart_id,
              "sender_id": item.sender_id,
              "message": item.message
            }
          })
        });

        const response = ({
            "items": [
              ...messages
            ],
            "meta": {
              "totalItems": totalMessages,
              "itemCount": messages.length,
              "itemsPerPage": Number(limit),
              "totalPages": totalPages,
              "currentPage": Number(page)
            },
            "links": {
              "first": `/purchase/${cartId}/messages`,
              "previous": previousPagePath,
              "next": `/purchase/${cartId}/messages?page=${Number(page) + 1}`,
              "last": `/purchase/${cartId}/messages?page=${totalPages}`
            }
          });

        return response;
    }

    create(body: any) {
        const newMessage = this.messageRepo.create(body);
        return this.messageRepo.save(newMessage);
    }

    async update(id: number, body: any): Promise<MessagePostPurchase> {
        const message = await this.messageRepo.findOne(id);
        this.messageRepo.merge(message, body);
        return this.messageRepo.save(message);
    }
}
