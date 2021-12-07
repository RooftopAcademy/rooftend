import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { UpdateOfferDto } from '../dto/update-offer.dto';
import { Offer } from '../entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async paginate(options: IPaginationOptions) {
    return paginate<Offer>(this.offersRepository, options);
  }

  create(createOfferDto: CreateOfferDto) {
    return 'This action adds a new offer';
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
