import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { CustomMessage } from '../entities/custom-messages.entity';

@Injectable()
@QueryService(CustomMessage)
export class CustomMessagesService extends TypeOrmQueryService<CustomMessage> {
  constructor(
    @InjectRepository(CustomMessage)
    private readonly CustomMessageRepo: Repository<CustomMessage>,
  ) {
    super(CustomMessageRepo, { useSoftDelete: true });
  }

  findAll(userId: number): Promise<CustomMessage[]> {
    return this.CustomMessageRepo.find({ userId });
  }

  findOne(id: number): Promise<CustomMessage> {
    return this.CustomMessageRepo.findOne(id);
  }

  create(body: any): Promise<CustomMessage[]> {
    const customMessage = this.CustomMessageRepo.create(body)
    return this.CustomMessageRepo.save(customMessage);
  }

  async update(id: number, body: any): Promise<CustomMessage> {
    const customMessage = await this.findOne(id);
    this.CustomMessageRepo.merge(customMessage, body);
    return this.CustomMessageRepo.save(customMessage);
  }

  async delete(id: number): Promise<boolean> {
    await this.CustomMessageRepo.softDelete(id);
    return true;
  }
}
