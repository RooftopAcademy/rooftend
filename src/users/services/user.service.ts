import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){

    }

    findOne(id: number){
        return this.userRepo.findOne(id);
    }

    findAll(){
        return this.userRepo.find();
    }

    create(body: any){
        const newUser = this.userRepo.create(body);
        return this.userRepo.save(newUser);
    }

    async update(id: number, body: any){
        const user = await this.userRepo.findOne(id);
        this.userRepo.merge(user,body);
        return this.userRepo.save(user);
    }

    delete(id: number){
        return this.userRepo.delete(id);   
    }
}
