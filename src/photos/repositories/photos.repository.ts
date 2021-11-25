import { EntityRepository } from 'typeorm';
import { AbstractPolymorphicRepository } from 'typeorm-polymorphic';
import { PhotosEntity } from '../models/photos.entity';

@EntityRepository(PhotosEntity)
export class PhotosRepository extends AbstractPolymorphicRepository<PhotosEntity> {}
