import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  findAll() {
    return [
      {
        id: 1,
        title: 'title',
        content: 'content',
        user: {},
        item: {},
      },
      {
        id: 2,
        title: 'title 2',
        content: 'content 2',
        user: {},
        item: {},
      },
      {
        id: 3,
        title: 'title 3',
        content: 'content 3',
        user: {},
        item: {},
      },
    ];
  }

  findOne(id: string) {
    return {
      id: id,
      title: 'title',
      content: 'content',
      user: {},
      item: {},
    };
  }

  create(body: any) {
    // it would return the created entity
    return {
        id: 4,
        title: 'title 4',
        content: 'content 4',
        user: {},
        item: {},
    };
  }

  update(id: string, body: any) {
    // it would return the updated entity
    return {
        id: 1,
        title: 'updated title',
        content: 'updated content',
        user: {},
        item: {},
    };
  }

  delete(id: string) {
    return;
  }
}
