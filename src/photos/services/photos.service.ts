import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Photos } from '../models/photos.entity';
import { PhotosInterface } from '../models/photos.interface';
import { Observable, from } from 'rxjs';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photos)
    private readonly photoRepo: Repository<Photos>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<Photos>> {
    return paginate<Photos>(this.photoRepo, options, {
      where: { user: { id: user.id } },
    });
  }

  create(photo: PhotosInterface): Observable<PhotosInterface> {
    return from(this.photoRepo.save(photo));
  }

  findAll(): Observable<Photos[]> {
    return from(this.photoRepo.find());
  }

  async findOne(id: number) {
    const photo = await this.photoRepo.findOne(id, {
      relations: ['user'],
    });

    return photo;
  }

  delete(photo: Photos): Observable<DeleteResult> {
    return from(this.photoRepo.delete(photo));
  }
}
