import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePlatformDTO } from '../create-platform-dto.entity';
import { Platform } from '../platform.entity';
import { UpdatePlatformDTO } from '../update-platform-dto.entity';

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

  async create(platform: CreatePlatformDTO): Promise<Platform> {
    if (await this.exists(platform)) {
      throw new Error('The platform already exists');
    }
    return this.platformRepository.save(platform);
  }

  async update(
    id: number | string,
    platform: UpdatePlatformDTO,
  ): Promise<UpdateResult> {
    if (!(await this.findOneById(id))) {
      throw new Error('Platform not found');
    }
    const foundId = await this.exists(platform);
    if (foundId && (await this.exists(platform)) != id) {
      throw new Error(
        'This modification will produce two platforms with the same attributes',
      );
    }
    platform.updatedAt = new Date();
    return this.platformRepository.update(id, platform);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.platformRepository.delete(id);
  }

  async exists(
    platform: CreatePlatformDTO | UpdatePlatformDTO,
  ): Promise<number | null> {
    const foundPlatform = await this.platformRepository.findOne(platform);
    if (foundPlatform) {
      return foundPlatform.id;
    }
    return null;
  }
}
