import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { CustomMessage } from '../entities/custom-messages.entity';
import { User } from '../../users/entities/user.entity';
import { CreateCustomMessageDTO } from '../entities/create-custom-messages.dto';
import { UpdateCustomMessageDTO } from '../entities/update-custom-messages.dto';

@Injectable()
@QueryService(CustomMessage)
export class CustomMessagesService extends TypeOrmQueryService<CustomMessage> {
  constructor(
    @InjectRepository(CustomMessage)
    private readonly CustomMessageRepo: Repository<CustomMessage>,
  ) {
    super(CustomMessageRepo, { useSoftDelete: true });
  }

  findAll(user: User): Promise<CustomMessage[]> {
    return this.CustomMessageRepo.find({ user });
  }

  async findOne(id: number): Promise<CustomMessage> {
    const customMessage: CustomMessage = await this.CustomMessageRepo.findOne(
      id,
    );

    if (!customMessage) throw new NotFoundException('Not Found Custom Message');

    return customMessage;
  }

  create(user: User, body: CreateCustomMessageDTO): Promise<CustomMessage> {
    const customMessage: CustomMessage = this.CustomMessageRepo.create(body);
    customMessage.user = user;

    return this.CustomMessageRepo.save(customMessage);
  }

  async update(
    customMessage: CustomMessage,
    body: UpdateCustomMessageDTO,
  ): Promise<CustomMessage> {
    this.CustomMessageRepo.merge(customMessage, body);
    return this.CustomMessageRepo.save(customMessage);
  }

  async delete(id: number): Promise<boolean> {
    await this.CustomMessageRepo.softDelete(id);
    return true;
  }
}
