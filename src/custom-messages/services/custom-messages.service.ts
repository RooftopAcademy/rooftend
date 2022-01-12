import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { CustomMessage } from '../entities/custom-messages.entity';
import { User } from '../../users/entities/user.entity';
import { CaslAbilityFactory } from '../../auth/casl/casl-ability.factory';
import { Permission } from '../../auth/permission.enum';
import { subject } from '@casl/ability';
import { CreateCustomMessageDTO } from '../entities/create-custom-messages.dto';

@Injectable()
@QueryService(CustomMessage)
export class CustomMessagesService extends TypeOrmQueryService<CustomMessage> {
  constructor(
    @InjectRepository(CustomMessage)
    private readonly CustomMessageRepo: Repository<CustomMessage>,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {
    super(CustomMessageRepo, { useSoftDelete: true });
  }

  private async failIfCanNotAccess(
    permission: Permission,
    user: User,
    customMessage: CustomMessage,
  ): Promise<void> {
    const ability = this.caslAbilityFactory.createForUser(user);
    customMessage.user.id = +customMessage.user.id;

    if (ability.cannot(permission, subject('CustomMessage', customMessage)))
      throw new ForbiddenException();
  }

  findAll(user: User): Promise<CustomMessage[]> {
    return this.CustomMessageRepo.find({ user });
  }

  async findOne(user: User, id: number): Promise<CustomMessage> {
    const customMessage: CustomMessage = await this.CustomMessageRepo.findOne(
      id,
    );

    if (!customMessage) throw new NotFoundException('Not Found Custom Message');

    await this.failIfCanNotAccess(Permission.Read, user, customMessage);

    return customMessage;
  }

  create(user: User, body: CreateCustomMessageDTO): Promise<CustomMessage> {
    const customMessage: CustomMessage = this.CustomMessageRepo.create(body);
    customMessage.user = user;

    return this.CustomMessageRepo.save(customMessage);
  }

  async update(user: User, id: number, body: any): Promise<CustomMessage> {
    const customMessage: CustomMessage = await this.CustomMessageRepo.findOne(
      id,
    );

    if (!customMessage) throw new NotFoundException('Not Found Custom Message');

    await this.failIfCanNotAccess(Permission.Update, user, customMessage);

    if (!customMessage) throw new NotFoundException('Not Found Custom Message');

    this.CustomMessageRepo.merge(customMessage, body);
    return this.CustomMessageRepo.save(customMessage);
  }

  async delete(user: User, id: number): Promise<boolean> {
    const customMessage: CustomMessage = await this.CustomMessageRepo.findOne(
      id,
    );

    await this.failIfCanNotAccess(Permission.Delete, user, customMessage);

    await this.CustomMessageRepo.softDelete(id);
    return true;
  }
}
