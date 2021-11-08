import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountStatusEntity } from '../model/account-status.entity';
import { AccountStatus } from '../model/account-status.interface';

@Injectable()
export class AccountStatusService {
        constructor(
            @InjectRepository(AccountStatusEntity)
            private readonly accountStatusRepository: Repository<AccountStatusEntity>
        ) { }

    createStatus(accountStatus: AccountStatus) {
        return this.accountStatusRepository.save(accountStatus);
    }

    findAllStatus() {
        return this.accountStatusRepository.find();
    }

    uptateStatus(id: number, accountStatus: AccountStatus) {
        return this.accountStatusRepository.update(id, accountStatus);
    }

    deleteStatus(id: number) {
        return this.accountStatusRepository.delete(id);
    }
}
