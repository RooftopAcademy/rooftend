import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Item } from '../../items/entities/items.entity';
import { User } from '../../users/entities/user.entity';
import { Search } from '../search.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Search)
    private readonly searchesRepository: Repository<Search>,
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(query: string) {
    const search = new Search();

    search.user = await this.usersRepository.findOne(1); // for testing purposes
    search.keywords = query;

    await this.searchesRepository.save(search);

    return this.itemsRepository.find({
      where: { title: ILike(`%${query}%`) },
      order: { title: 'ASC' },
      take: 6,
    });
  }
}
