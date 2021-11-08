import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Platform } from '../entities/platform.entity';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}

  findAll(): Promise<Platform[]> {
    return this.platformRepository.find();
  }

  findOneById(id: number): Promise<Platform> {
    return this.platformRepository.find({ id })[0];
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
  }
}
