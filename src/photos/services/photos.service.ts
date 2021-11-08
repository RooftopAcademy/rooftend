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
    return `{
      id: ${id},
      created_at: Date,
      url: varchar (200),
      width: smallint,
      height: smallint,
      size: integer,
      subject: integer,
      subject_type: varchar (200),
      redirect_url: varchar(200)
    }
    `;
  }

  update(id: number, body: any) {
    return `Photo id= ${id} updated as ${body}`;
  }

  delete(id: number) {
    return `Photo id= ${id} was deleted`;
  }
}
