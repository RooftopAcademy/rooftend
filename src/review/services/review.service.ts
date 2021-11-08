import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  findAll() {
    return [];
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

  create() {
    return 'Review created.';
  }

  update(id: string) {
    return `Review ${id} updated`;
  }

  delete(id: string) {
    return `Review ${id} deleted.`;
  }
}
