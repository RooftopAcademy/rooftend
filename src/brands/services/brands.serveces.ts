import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
    IPaginationOptions, 
    paginate, 
    Pagination 
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brands.entity';

@Injectable()
export class brandsService{
    constructor(
        @InjectRepository(Brand) 
        private brandRepo: Repository<Brand>
    ){}
    findOne(id: number){
        return this.brandRepo.findOne(id);
    }

    findAll(){
        return this.brandRepo.find();
    }

    create(body: any){
        const newBrand = this.brandRepo.create(body);
        return this.brandRepo.save(newBrand);
    }

    async update(id: number, body: any){
        const brand = await this.brandRepo.findOne(id);
        this.brandRepo.merge(brand, body);
        return this.brandRepo.save(brand);
    }

    async delete(id: number){
        await this.brandRepo.delete(id)
        return true;
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Brand>> {
        return paginate<Brand>(this.brandRepo, options);
    }
}