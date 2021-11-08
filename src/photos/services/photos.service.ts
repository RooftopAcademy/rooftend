import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotosService {
  create(photo: any) {
    return `Photo ${photo} created`;
  }

  findAll() {
    return [1, 2, 3, 4];
  }

  findOne(id: number) {
    return `Photo id= ${id}`;
  }

  update(id: number, body: any) {
    return `Photo id= ${id} updated as ${body}`;
  }

  delete(id: number) {
    return `Photo id= ${id} was deleted`;
  }
}
