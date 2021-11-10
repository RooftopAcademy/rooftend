import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entities/brands.entity';

@Injectable()
export class brandsService{
    constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>){

    }

    findOne(id: number){
        this.brandRepo.findOne(id);
    }

    findAll(){
        this.brandRepo.find();
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
}