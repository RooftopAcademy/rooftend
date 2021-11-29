import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AccountStatusEntity } from '../models/account-status.entity';
import { AccountStatus } from '../models/account-status.dto';

@Injectable()
export class AccountStatusService {
  constructor(
    @InjectRepository(AccountStatusEntity)
    private readonly accountStatusRepository: Repository<AccountStatusEntity>,
  ) { }

  createStatus(accountStatus: AccountStatus): Promise<AccountStatus> {
    return this.accountStatusRepository.save(accountStatus);
  }

  findAllStatus(): Promise<AccountStatus[]> {
    return this.accountStatusRepository.find();
  }

  findOneStatus(id: number): Promise<AccountStatus> {
    return this.accountStatusRepository.findOne(id);
  }

  updateStatus(
    id: number,
    accountStatus: AccountStatus,
  ): Promise<UpdateResult> {
    return this.accountStatusRepository.update(id, accountStatus);
  }

  deleteStatus(id: number): Promise<DeleteResult> {
    return this.accountStatusRepository.delete(id);
  }
}
