import { EntityRepository } from 'typeorm';
import { AbstractPolymorphicRepository } from 'typeorm-polymorphic';
import { Photos } from '../models/photos.entity';

@EntityRepository(Photos)
export class PhotosRepository extends AbstractPolymorphicRepository<Photos> {}
