import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Repository } from 'typeorm';
=======
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
import { Platform } from '../platform.entity';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}

<<<<<<< HEAD
  findAll(): Promise<Platform[]> {
    return this.platformRepository.find();
  }

  findOneById(id: number | string): Promise<Platform> {
    return this.platformRepository.findOne(id);
  }

  create(platform: Platform): boolean {
    try {
      this.platformRepository.save(platform);
      return true;
    } catch {
      return false;
    }
  }

  update(id: number, platform: Platform): boolean {
    try {
      this.platformRepository.update(id, platform);
      return true;
    } catch {
      return false;
    }
  }

  async remove(id: number) {
    const platform: Platform = await this.findOneById(id);
    this.platformRepository.remove(platform);
=======
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
>>>>>>> aa86e1390f27145513afe7ba3289c14f11f8eaf7
  }
}
