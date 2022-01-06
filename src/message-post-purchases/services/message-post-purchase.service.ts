import { Injectable } from '@nestjs/common';
import { MessagePostPurchase } from '../entities/message-post-purchase.entity';
import { getConnection, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { map, Observable } from 'rxjs';



@Injectable()
export class MessagePostPurchaseService {
    constructor(@InjectRepository(MessagePostPurchase) private messageRepo: Repository<MessagePostPurchase>) {

    }

    async paginate(options: IPaginationOptions, cartId: number): Promise<Pagination<MessagePostPurchase>>{
      const queryBuilder = getConnection().createQueryBuilder()
        .select("mgp.id") 
        .addSelect("mgp.cart_id")
        .addSelect("mgp.message")
        .addSelect("mgp.sender_id")
        .from(MessagePostPurchase, "mgp") 
        .where("mgp.cart_id = :cart_id", { cart_id: cartId});
      console.log(queryBuilder)

      return paginate<MessagePostPurchase>(queryBuilder, options);
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
