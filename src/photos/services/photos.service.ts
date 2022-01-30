import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Photos } from '../models/photos.entity';
import { PhotosInterface } from '../models/photos.interface';
import { Observable, from } from 'rxjs';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { PhotosRepository } from '../repositories/photos.repository';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photos)
    private readonly photosRepository: PhotosRepository,
  ) {}

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<Photos>> {
    return paginate<Photos>(this.photosRepository, options);
  }

  create(photo: PhotosInterface): Observable<PhotosInterface> {
    return from(this.photosRepository.save(photo));
  }

  findAll(): Observable<Photos[]> {
    return from(this.photosRepository.find());
  }

  async findOne(id: number) {
    const photo = await this.photosRepository.findOne(id, {
      relations: ['user'],
    });

    return photo;
  }

  delete(photo: Photos): Observable<DeleteResult> {
    return from(this.photosRepository.delete(photo));
  }
}
