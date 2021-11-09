import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PhotosEntity } from '../models/photos.entity';
import { PhotosInterface } from '../models/photos.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotosEntity)
    private readonly photosRepository: Repository<PhotosEntity>,
  ) {}

  create(photo: PhotosInterface): Observable<PhotosInterface> {
    return from(this.photosRepository.save(photo));
  }

  findAll(): Observable<PhotosEntity[]> {
    return from(this.photosRepository.find());
  }

  findOne(id: number): Observable<PhotosEntity> {
    return from(this.photosRepository.findOne(id));
  }

  update(id: number, body: any): Observable<UpdateResult> {
    return from(this.photosRepository.update(id, body));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.photosRepository.delete(id));
  }
}
