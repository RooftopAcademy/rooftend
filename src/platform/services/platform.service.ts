import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreatePlatformDTO } from '../entities/create-platform-dto.entity';
import { Platform } from '../entities/platform.entity';
import { UpdatePlatformDTO } from '../entities/update-platform-dto.entity';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}

  async findAll(): Promise<Platform[]> {
    return await this.platformRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }

  async findOneById(id: number | string): Promise<Platform> {
    const platform = await this.platformRepository.findOne(id);

    if (!platform) {
      throw new NotFoundException('Platform not found');
    }

    return platform;
  }

  async create(platform: CreatePlatformDTO): Promise<{
    message: string;
  }> {
    if (await this.exists(platform)) {
      throw new ConflictException('The platform already exists');
    }

    const newPlatform = this.platformRepository.create(platform);
    await this.platformRepository.save(newPlatform);

    return {
      message: 'Platform Created',
    };
  }

  async update(
    id: number | string,
    platform: UpdatePlatformDTO,
  ): Promise<{
    message: string;
  }> {
    await this.findOneById(id);

    const foundId = await this.exists(platform);
    if (foundId && foundId != id) {
      throw new ConflictException(
        'This modification will produce two platforms with the same attributes',
      );
    }

    platform.updatedAt = new Date();

    this.platformRepository.update(id, platform);

    return { message: 'Platform Updated' };
  }

  async remove(id: string | number): Promise<{
    message: string;
  }> {
    await this.findOneById(id);

    await this.platformRepository.softDelete(id);

    return { message: 'Platform Deleted' };
  }

  async exists(
    platform: CreatePlatformDTO | UpdatePlatformDTO,
  ): Promise<number | null> {
    const foundPlatform = await this.platformRepository.findOne({
      where: {
        countryCode: platform.countryCode,
        currencyCode: platform.currencyCode,
        langCode: platform.langCode,
        phoneCountryCode: platform.phoneCountryCode,
      },
    });
    if (foundPlatform) {
      return foundPlatform.id;
    }
    return null;
  }
}
