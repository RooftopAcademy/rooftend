import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

@Injectable()
export class PlatformService {
  // constructor(@InjectRepository(Platform) private platformRepository: Repository<Platform>){

  findAll(): string {
    // this.platformRepository.find();
    return 'This action returns all the platforms';
  }

  findOneById(id: string) {
    // this.platformRepository.findOne(id);
    return `This action returns the platform with id = ${id}`;
  }

  create(body: Body): string {
    console.log(body);
    // this.platformRepository.save(body);
    return 'This action creates a new platform';
  }

  update(id: string, body: Body): string {
    console.log(body);
    // this.platformRepository.findOneAndUpdate(id, body);
    return `This action updates the platform with id = ${id}`;
  }

  remove(id: string): string {
    // this.platformRepository.findByIdAndDelete(id);
    return `This action removes the platform with id = ${id}`;
  }
}
