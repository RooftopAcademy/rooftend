import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../profile.entity';

@Injectable()
export class ProfileService {
  public constructor(
    @InjectRepository(Profile) private repository: Repository<Profile>,
  ) {}

  all() {
    return this.repository.find();
  }

  find(id: string | number) {
    return this.repository.findOne(id);
  }
}
