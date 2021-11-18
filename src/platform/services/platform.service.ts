import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Platform } from '../platform.entity';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}

  findAll(): Promise<Platform[]> {
    return this.platformRepository.find();
  }

  findOneById(id: number | string): Promise<Platform> {
    return this.platformRepository.findOne(id);
  }

  create(platform: Platform) {
    try {
      this.platformRepository.save(platform);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  update(id: number | string, platform: Platform) {
    try {
      this.platformRepository.update(id, platform);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async remove(id: number) {
    try {
      this.platformRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
