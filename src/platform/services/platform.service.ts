import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Platform } from '../platform.entity';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}

  async findAll(): Promise<Platform[]> {
    return this.platformRepository.find();
  }

  async findOneById(id: number | string): Promise<Platform> {
    return this.platformRepository.findOne(id);
  }

  async create(platform: Platform): Promise<Platform> {
    return this.platformRepository.save(platform);
  }

  async update(id: number | string, platform: Platform): Promise<UpdateResult> {
    return this.platformRepository.update(id, platform);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.platformRepository.delete(id);
  }
}
