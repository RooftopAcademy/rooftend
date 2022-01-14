import { Injectable } from '@nestjs/common';
import { MessagePostPurchase } from '../entities/message-post-purchase.entity';
import { getConnection, Repository } from 'typeorm';
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

    async find(cartId: number, options: IPaginationOptions): Promise<Pagination<MessagePostPurchase>>{
      const queryBuilder = getConnection().createQueryBuilder()
        .select(["mgp.message","mgp.sent_at"])
        .from(MessagePostPurchase, "mgp")
        .innerJoin("mgp.sender_id", "users")
        .addSelect("users.username")
        .innerJoin("mgp.receiver_id", "user")
        .addSelect("user.username")
        .where("mgp.cart_id = :cart_id", { cart_id: cartId})

      return paginate<MessagePostPurchase>(queryBuilder, options);
    }

    async findOneById(id : number): Promise<MessagePostPurchase>{
        return await this.messageRepo.findOne(id);
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
