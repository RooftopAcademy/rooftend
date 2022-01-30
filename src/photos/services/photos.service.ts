import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PhotosEntity } from '../models/photos.entity';
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
    @InjectRepository(PhotosEntity)
    private readonly photosRepository: PhotosRepository,
  ) {}

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<PhotosEntity>> {
    return paginate<PhotosEntity>(this.photosRepository, options);
  }

  create(photo: PhotosInterface): Observable<PhotosInterface> {
    return from(this.photosRepository.save(photo));
  }

  findAll(): Observable<PhotosEntity[]> {
    return from(this.photosRepository.find());
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.photosRepository.delete(id));
  }
}
